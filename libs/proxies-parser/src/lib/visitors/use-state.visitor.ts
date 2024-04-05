import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { ReaxyParserOptions } from '../config';
import {
  CallExpression,
  Identifier,
  ImportDeclaration,
  isIdentifier,
  isImportSpecifier,
  SourceLocation,
} from '@babel/types';
import { hasCalleeIdentifier, createHigherOrderFunction } from '../utils';
import { replaceStateByStateCreator } from '../transformers';

/**
 * The visitor object for handling useState calls within the AST.
 * It looks for specific patterns and applies transformations based on the plugin options.
 */
export const useStateVisitor = () => ({
  CallExpression(path: NodePath<t.CallExpression>) {
    if (hasUseStateCalleeName(path)) {
      if (path.node.callee.loc) {
        path.node.callee = createHigherOrderFunction('useStateProxy', {
          line: path.node.callee.loc.start.line,
        });
      }
    }
  },
  ImportDeclaration(path: NodePath<ImportDeclaration>) {
    if (path.node.source.value === 'react') {
      path.node.specifiers = path.node.specifiers.map((specifier) => {
        if (isImportSpecifier(specifier)) {
          const { imported } = specifier;
          if (isIdentifier(imported)) {
            if (
              specifier.local.name === 'useState' &&
              imported.name === 'useState'
            ) {
              path.node.source.value = '@creaux/container-proxies';
              specifier.local.name = 'useStateProxy';
              imported.name = 'useStateProxy';
              specifier.imported = imported;
            }
          }
        }
        return specifier;
      });
    }
  },
  ReferencedIdentifier(path: NodePath<t.Identifier | t.JSXIdentifier>) {
    const { node, scope } = path;
    const { name } = node;

    // Get the binding associated with the identifier
    const binding = scope.getBinding(name);

    if (binding) {
      // If the binding exists, it means the identifier has a declaration
      const { path: bindingPath } = binding;

      // If the binding path points to a VariableDeclarator, access its 'init' property
      if (t.isVariableDeclarator(bindingPath.node)) {
        const initValue = bindingPath.node.init;

        // Check if the initialization value is a CallExpression
        if (t.isCallExpression(initValue)) {
          const { callee } = initValue;
          if (t.isCallExpression(callee)) {
            const { callee: calleeIdentifier } = callee;
            if (t.isIdentifier(calleeIdentifier)) {
              const calleeName = calleeIdentifier.name;
              const desiredName = 'useStateProxy';

              // Compare the name of the callee with the desired name
              if (calleeName === desiredName) {
                // Replace setState by setStateCreator
                if (
                  t.isIdentifier(path.node) &&
                  t.isCallExpression(path.parent)
                ) {
                  if (t.isIdentifier(path.parent.callee)) {
                    if (path.parent.callee.loc) {
                      path.parent.callee = createHigherOrderFunction(
                        path.parent.callee.name,
                        {
                          line: (path.parent.callee.loc as SourceLocation).start
                            .line,
                        },
                      );
                    }
                  }
                }

                // Replace state by getStateCreator
                if (
                  !(
                    t.isCallExpression(path.parent) &&
                    t.isIdentifier(path.parent.callee)
                  ) &&
                  t.isIdentifier(path.node)
                ) {
                  path.replaceWith(
                    replaceStateByStateCreator({
                      state: path.node.name,
                      line: (path.node.loc as SourceLocation).start.line,
                    }),
                  );
                }
              }
            }
          }
        }
      }
    }
  },
});

function hasUseStateCalleeName(path: NodePath<CallExpression>): boolean {
  return (
    hasCalleeIdentifier(path) &&
    (path.node.callee as Identifier).name === 'useState'
  );
}
