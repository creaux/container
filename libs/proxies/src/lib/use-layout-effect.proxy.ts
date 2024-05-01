import {
  createUseLayoutEffect,
  ReaxyMeta,
} from '@creaux/container-proxies-creators';
import { store, track, Track } from '@creaux/container-store';
import { wait } from './wait';

export const useLayoutEffectProxy = (meta: ReaxyMeta) =>
  createUseLayoutEffect(
    (meta: ReaxyMeta) => {
      wait(500);
      store.dispatch(track(Track.create('MOUNT', meta)));
    },
    (meta: ReaxyMeta) => {
      wait(500);
      store.dispatch(track(Track.create('UNMOUNT', meta)));
    },
    () => {
      wait(500);
      store.dispatch(track(Track.create('REGISTER', meta)));
    },
  );
