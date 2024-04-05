import type { DependencyList } from 'react';
import { useLayoutEffect as useLayoutEffectBase } from 'react';
import { ReaxyMeta } from '../reaxy-meta.interface';

type EffectCallback = () => void | [meta: ReaxyMeta, () => void];
type UseLayoutEffectCreator = (
  effect: [ReaxyMeta, EffectCallback],
  deps?: DependencyList,
) => void;

export const createUseLayoutEffect = (
  onMount: (meta: ReaxyMeta) => void,
  onUnmount: (meta: ReaxyMeta) => void,
  onRegistered: () => void,
) =>
  new Proxy(useLayoutEffectBase, {
    apply: function (
      target: typeof useLayoutEffectBase,
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
  }) as unknown as UseLayoutEffectCreator;
