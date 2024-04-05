import { createUseEffect, ReaxyMeta } from '@creaux/container-proxies-creators';
import { store, track, Track } from '@creaux/container-store';

export const useEffectProxy = (meta: ReaxyMeta) =>
  createUseEffect(
    (meta) => {
      Track.wait(500);
      store.dispatch(track(Track.create('MOUNT', meta)));
    },
    (meta) => {
      Track.wait(500);
      store.dispatch(track(Track.create('UNMOUNT', meta)));
    },
    () => {
      Track.wait(500);
      store.dispatch(track(Track.create('REGISTER', meta)));
    },
  );
