import { Comment } from '@babel/types';

export function isCommentWithId(idRegExp: RegExp, comment: Comment): boolean {
  return idRegExp.test(comment.value);
}
