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
  public step: string;
  public datetime: string;
  public cast = 0;

  /**
   * @param  {Code} code Represent available step tracked from the code run
   * @param  {Meta} meta meta information about code which is tracked
   */
  constructor(
    public code: Code,
    public meta: Meta,
  ) {
    this.step = this.code;
    this.datetime = Track.getDateTime(this.timestamp);
  }

  static wait(ms: number) {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }

  static create(code: Code, meta: Meta) {
    return instanceToPlain(new Track(code, meta));
  }

  private static getDateTime(timestamp: number): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    const miliseconds = '00' + date.getMilliseconds();

    return `${year}-${month}-${day} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}:${miliseconds}`;
  }
}
