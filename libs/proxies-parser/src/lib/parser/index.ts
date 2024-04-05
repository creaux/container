import { parse } from '@babel/parser';

export function parser(code: string) {
  return parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
    attachComment: true,
  });
}
