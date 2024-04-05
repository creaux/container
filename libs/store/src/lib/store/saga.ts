import { all } from 'redux-saga/effects';
import { watchEffectComponentFetchCode } from '../slices/component.saga';

export function* saga() {
  yield all([watchEffectComponentFetchCode()]);
}
