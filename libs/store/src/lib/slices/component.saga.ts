import { call, cancelled, put, take } from 'redux-saga/effects';
import { END, eventChannel } from 'redux-saga';
import { EventChannel } from '@redux-saga/core';
import { code } from './component.slice';
import { CancelledEffect } from '@redux-saga/core/effects';

export function fetchCode() {
  return eventChannel((emitter) => {
    // eslint-disable-next-line @nx/enforce-module-boundaries
    import('../../../../worker/src/lib/src/component.assess.tsx?raw')
      .then((data) => {
        emitter(data.default);
      })
      .catch(() => {
        emitter(END);
      });

    return () => {
      console.log('unsubscribed');
    };
  });
}

export function* watchEffectComponentFetchCode() {
  const channel: EventChannel<object> = yield call(fetchCode);
  try {
    while (true) {
      const data: string = yield take(channel);
      yield put(code(data));
    }
  } finally {
    if ((yield cancelled()) as CancelledEffect) {
      channel.close();
    }
  }
}
