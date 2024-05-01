import { createUseEffect } from '@creaux/container-proxies-creators';
import { store, track } from '@creaux/container-store';
import { wait } from './wait';
import { Meta, Track } from '@creaux/playhouse-track';

export const useEffectProxy = (meta: Meta) =>
  createUseEffect(
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
