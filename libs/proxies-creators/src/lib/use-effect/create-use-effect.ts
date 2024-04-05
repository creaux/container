import type { DependencyList } from 'react';
import { useEffect as useEffectBase } from 'react';
import { ReaxyMeta } from '../reaxy-meta.interface';

type EffectCallback = () => void | [meta: ReaxyMeta, () => void];
type UseEffectCreator = (
  effect: [ReaxyMeta, EffectCallback],
  deps?: DependencyList,
) => void;

export const createUseEffect = (
  onMount: (meta: ReaxyMeta) => void,
  onUnmount: (meta: ReaxyMeta) => void,
  onRegistered: () => void,
) =>
  new Proxy(useEffectBase, {
    apply: function (
      target: typeof useEffectBase,
      thisArg: string,
      args: [[meta: ReaxyMeta, EffectCallback], DependencyList?],
    ) {
      function handleMount(): (() => void) | void {
        onMount(args[0][0]);
        const destruct = args[0][1]();
        if (destruct) {
          return handleDestruct.bind(undefined, destruct[0], destruct[1]);
        }
      }

      function handleDestruct(meta: ReaxyMeta, destructor: () => void) {
        onUnmount(meta);
        return destructor();
      }

      Reflect.apply(target, thisArg, [handleMount, args[1]]);
      onRegistered();
    },
  }) as unknown as UseEffectCreator;
