import {
  createUseLayoutEffect,
  ReaxyMeta,
} from '@creaux/container-proxies-creators';
import { store, track, Track } from '@creaux/container-store';

export const useLayoutEffectProxy = (meta: ReaxyMeta) =>
  createUseLayoutEffect(
    (meta: ReaxyMeta) => {
      Track.wait(500);
      store.dispatch(track(Track.create('MOUNT', meta)));
    },
    (meta: ReaxyMeta) => {
      Track.wait(500);
      store.dispatch(track(Track.create('UNMOUNT', meta)));
    },
    () => {
      Track.wait(500);
      store.dispatch(track(Track.create('REGISTER', meta)));
    },
  );
