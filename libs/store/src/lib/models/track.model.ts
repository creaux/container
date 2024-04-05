import { instanceToPlain } from 'class-transformer';

export interface Meta {
  id?: string;
  line: number;
}

export type Steps =
  | 'INIT'
  | 'REGISTER'
  | 'RETURN'
  | 'MOUNT'
  | 'UNMOUNT'
  | 'REGISTER_USE_STATE'
  | 'SET_STATE'
  | 'GET_STATE';

export class Track {
  static Steps: Steps;
  id: string = Math.random().toString(36).substring(2, 9);
  step: string;
  timestamp: number = Date.now();
  datetime: string;
  cast = 0;

  constructor(
    public code: Steps,
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

  static create(code: Steps, meta: Meta) {
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
