import * as t from '@babel/types';
import generate from '@babel/generator';

export function generator(ast: t.Node, code: string) {
  return generate(ast, {}, code);
}
