import type { EffectCallback } from 'react';
import { vi } from 'vitest';
import { createUseEffect } from './create-use-effect';

vi.mock('react', () => ({
  useEffect: (onMount: EffectCallback) => {
    onMount();
  },
}));

test('should register onMount', () => {
  const onUnmount = vi.fn();
  const onMount = vi.fn(onUnmount);
  const onRegister = vi.fn();
  const useEffectCreator = createUseEffect(onMount, onUnmount, onRegister);
  useEffectCreator(
    [
      { line: 1 },
      () => {
        /* */
      },
    ],
    [],
  );
  expect(onMount).toHaveBeenCalled();
  expect(onUnmount).toHaveBeenCalled();
  expect(onRegister).toHaveBeenCalled();
});
