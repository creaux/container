import { Dispatch, SetStateAction, useState } from 'react';
import { ReaxyMeta } from '../reaxy-meta.interface';

export function createUseState(
  onRegister: () => void,
  onSetState: (meta: ReaxyMeta) => void,
  onGetState: (meta: ReaxyMeta) => void,
) {
  return function useProxiedState<T>(
    initialState: T | (() => T),
  ): [
    (meta: ReaxyMeta) => { value: T },
    (meta: ReaxyMeta) => Dispatch<SetStateAction<T>>,
  ] {
    const [state, setState] = useState<T>(initialState);

    const setStateProxy = (meta: ReaxyMeta): Dispatch<SetStateAction<T>> =>
      new Proxy(setState, {
        apply(target, thisArg, argumentsList) {
          onSetState(meta);
          return Reflect.apply(target, thisArg, argumentsList);
        },
      });

    const getStateProxy = (meta: ReaxyMeta) =>
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
