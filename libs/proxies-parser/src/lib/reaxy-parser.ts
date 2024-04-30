import traverse from '@babel/traverse';
import { PluginOption } from 'vite';
import {
  useEffectVisitor,
  useStateVisitor,
  useLayoutEffectVisitor,
} from './visitors';
import { ReaxyParserOptions } from './config';
import { parser } from './parser';
import { generator } from './generators';

export function reaxyParser(options: ReaxyParserOptions): PluginOption {
  return {
    name: 'reaxy-parser-plugin',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.match(options.blob)) return null;
      const ast = parser(code);

      const useEffectVisitorInstance = useEffectVisitor();
      const useStateVisitorInstance = useStateVisitor();
      const useLayoutEffectVisitorInstance = useLayoutEffectVisitor();

      traverse(ast, {
        CallExpression(path) {
          useStateVisitorInstance.CallExpression(path);
          useEffectVisitorInstance.CallExpression(path);
          useLayoutEffectVisitorInstance.CallExpression(path);
        },
        ImportDeclaration(path) {
          useStateVisitorInstance.ImportDeclaration(path);
          useEffectVisitorInstance.ImportDeclaration(path);
          useLayoutEffectVisitorInstance.ImportDeclaration(path);
        },
        ReferencedIdentifier(path) {
          useStateVisitorInstance.ReferencedIdentifier(path);
        },
      });
      const result = generator(ast, code);
      return result;
    },
  };
}

export * from './config';
