import { Comment } from '@babel/types';

export function hasComments(
  trailingComments: Comment[] | null | undefined,
): trailingComments is Comment[] {
  return !!trailingComments && trailingComments?.length > 0;
}
