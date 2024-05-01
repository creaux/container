import { createUseLayoutEffect } from '@creaux/container-proxies-creators';
import { store, track } from '@creaux/container-store';
import { wait } from './wait';
import { Track, Meta } from '@creaux/playhouse-track';

export const useLayoutEffectProxy = (meta: Meta) =>
  createUseLayoutEffect(
    (meta: Meta) => {
      wait(500);
      store.dispatch(track(Track.create('MOUNT', meta)));
    },
    (meta: Meta) => {
      wait(500);
      store.dispatch(track(Track.create('UNMOUNT', meta)));
    },
    () => {
      wait(500);
      store.dispatch(track(Track.create('REGISTER', meta)));
    },
  );
