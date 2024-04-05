import type { FunctionComponent, ReactElement } from 'react';

export interface Props {
  [key: string]: number | string;
}

export const createComponent =
  (onInit: () => void) => (Component: FunctionComponent<Props>) => {
    return new Proxy(Component, {
      apply(
        target: FunctionComponent<Props>,
        thisArg: never,
        argArray: [props: Props],
      ): ReactElement {
        function NewComponent() {
          onInit();
          return target.apply(thisArg, argArray);
        }

        return Reflect.apply(NewComponent, thisArg, argArray);
      },
    });
  };
