import { Dispatch, SetStateAction, useState } from 'react';
import { Meta } from '@creaux/playhouse-track';

export function createUseState(
  onRegister: () => void,
  onSetState: (meta: Meta) => void,
  onGetState: (meta: Meta) => void,
) {
  return function useProxiedState<T>(
    initialState: T | (() => T),
  ): [
    (meta: Meta) => { value: T },
    (meta: Meta) => Dispatch<SetStateAction<T>>,
  ] {
    const [state, setState] = useState<T>(initialState);

    const setStateProxy = (meta: Meta): Dispatch<SetStateAction<T>> =>
      new Proxy(setState, {
        apply(target, thisArg, argumentsList) {
          onSetState(meta);
          return Reflect.apply(target, thisArg, argumentsList);
        },
      });

    const getStateProxy = (meta: Meta) =>
      new Proxy(
        { value: state },
        {
          get(target, prop: string) {
            if (prop === 'value') {
              onGetState(meta);
            }
            return target.value;
          },
          set(target, prop: string) {
            if (prop === 'value') {
              console.error('State is read-only');
            }
            return true;
          },
        },
      );

    onRegister();
    return [getStateProxy, setStateProxy];
  };
}
