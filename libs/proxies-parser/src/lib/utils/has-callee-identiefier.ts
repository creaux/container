import { NodePath } from '@babel/traverse';
import { CallExpression, isIdentifier } from '@babel/types';

export function hasCalleeIdentifier(
  path: NodePath<CallExpression>,
): ReturnType<typeof isIdentifier> {
  return path.node.callee && isIdentifier(path.node.callee);
}
