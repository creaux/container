import type { DependencyList } from 'react';
import { useLayoutEffect as useLayoutEffectBase } from 'react';
import { Meta } from '@creaux/playhouse-track';

type EffectCallback = () => void | [meta: Meta, () => void];
type UseLayoutEffectCreator = (
  effect: [Meta, EffectCallback],
  deps?: DependencyList,
) => void;

export const createUseLayoutEffect = (
  onMount: (meta: Meta) => void,
  onUnmount: (meta: Meta) => void,
  onRegistered: () => void,
) =>
  new Proxy(useLayoutEffectBase, {
    apply: function (
      target: typeof useLayoutEffectBase,
      thisArg: string,
      args: [[meta: Meta, EffectCallback], DependencyList?],
    ) {
      function handleMount(): (() => void) | void {
        onMount(args[0][0]);
        const destruct = args[0][1]();
        if (destruct) {
          return handleDestruct.bind(undefined, destruct[0], destruct[1]);
        }
      }

      function handleDestruct(meta: Meta, destructor: () => void) {
        onUnmount(meta);
        return destructor();
      }

      Reflect.apply(target, thisArg, [handleMount, args[1]]);
      onRegistered();
    },
  }) as unknown as UseLayoutEffectCreator;
