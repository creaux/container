import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { ReaxyParserOptions } from '../config';
import { isIdentifier, isImportSpecifier, SourceLocation } from '@babel/types';
import { transformReaxyMetaToProperties } from '../utils';

export const useLayoutEffectVisitor = (options: ReaxyParserOptions) => ({
  CallExpression(path: NodePath<t.CallExpression>) {
    const firstArg = path.node.arguments[0];
    const dependencies = path.node.arguments[1];
    if (t.isArrowFunctionExpression(firstArg)) {
      if (
        t.isIdentifier(path.node.callee) &&
        path.node.callee.name === 'useLayoutEffect'
      ) {
        const useEffectProperties = transformReaxyMetaToProperties({
          line: (path.node.callee.loc as SourceLocation).start.line,
        });
        const arrowFunctionProperties = transformReaxyMetaToProperties({
          line: (firstArg.loc as SourceLocation).start.line,
        });
        path.replaceWith(
          t.callExpression(
            t.callExpression(t.identifier('useLayoutEffectProxy'), [
              t.objectExpression(useEffectProperties),
            ]),
            [
              t.arrayExpression([
                t.objectExpression(arrowFunctionProperties),
                firstArg,
              ]),
              dependencies,
            ],
          ),
        );

        path.traverse({
          ReturnStatement(returnPath) {
            if (t.isArrowFunctionExpression(returnPath.node.argument)) {
              const properties = transformReaxyMetaToProperties({
                line: (returnPath.node.argument.loc as SourceLocation).start
                  .line,
              });
              if (t.isArrowFunctionExpression(returnPath.node.argument)) {
                returnPath.replaceWith(
                  t.returnStatement(
                    t.arrayExpression([
                      t.objectExpression(properties),
                      returnPath.node.argument,
                    ]),
                  ),
                );
              }
            }
          },
        });
      }
    }
  },
  ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
    if (path.node.source.value === 'react') {
      path.node.specifiers = path.node.specifiers.map((specifier) => {
        if (isImportSpecifier(specifier)) {
          const { imported } = specifier;
          if (isIdentifier(imported)) {
            // Only works when local and imported are both useEffect
            if (
              specifier.local.name === 'useLayoutEffect' &&
              imported.name === 'useLayoutEffect'
            ) {
              // Rename only if local and imported are both useEffect
              path.node.source.value = '@creaux/container-proxies';

              // This represent useEffect as useEffectCreator
              specifier.local.name = 'useLayoutEffectProxy';

              // This represent useEffectCreator as useEffectCreator
              imported.name = 'useLayoutEffectProxy';
              specifier.imported = imported;
            }
          }
        }
        return specifier;
      });
    }
  },
});
