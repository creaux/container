import { instanceToPlain } from 'class-transformer';

/**
 * Information about line code execution
 *
 * @param {string} id Unique id of meta information
 * @param {number} line Line number on which code is executed
 */
export interface Meta {
  id?: string;
  line: number;
}

/**
 * Code of lifecycle execution in the program
 */
export type Code =
  | 'INIT'
  | 'REGISTER'
  | 'RETURN'
  | 'MOUNT'
  | 'UNMOUNT'
  | 'REGISTER_USE_STATE'
  | 'SET_STATE'
  | 'GET_STATE';

export class Track {
  public id: string = Math.random().toString(36).substring(2, 9);
  public timestamp: number = Date.now();
  public cast = 0;

  /**
   * @param  {Code} step Represent available step tracked from the code run
   * @param  {Meta} meta meta information about code which is tracked
   */
  constructor(
    public step: Code,
    public meta: Meta,
  ) {}

  static create(code: Code, meta: Meta) {
    return instanceToPlain(new Track(code, meta));
  }
}
