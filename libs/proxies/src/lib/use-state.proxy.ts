import { createUseState, ReaxyMeta } from '@creaux/container-proxies-creators';
import { store, track, Track } from '@creaux/container-store';
import { wait } from './wait';

export const useStateProxy = (meta: ReaxyMeta) =>
  createUseState(
    () => {
      wait(500);
      store.dispatch(track(Track.create('REGISTER_USE_STATE', meta)));
    },
    (meta) => {
      wait(500);
      store.dispatch(track(Track.create('SET_STATE', meta)));
    },
    (meta) => {
      wait(500);
      store.dispatch(track(Track.create('GET_STATE', meta)));
    },
  );
