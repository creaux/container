import { createUseState } from '@creaux/container-proxies-creators';
import { store, track } from '@creaux/container-store';
import { wait } from './wait';
import { Track, Meta } from '@creaux/playhouse-track';

export const useStateProxy = (meta: Meta) =>
  createUseState(
    () => {
      wait(500);
      store.dispatch(track(Track.create('REGISTER_USE_STATE', meta)));
    },
    (meta: Meta) => {
      wait(500);
      store.dispatch(track(Track.create('SET_STATE', meta)));
    },
    (meta: Meta) => {
      wait(500);
      store.dispatch(track(Track.create('GET_STATE', meta)));
    },
  );
