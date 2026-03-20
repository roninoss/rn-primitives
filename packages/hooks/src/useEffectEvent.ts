import * as React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Stable callback that always calls the latest version of `callback`.
 * Compatibility shim for `useEffectEvent`.
 */
export function useEffectEvent<TArgs extends readonly unknown[], TResult>(
  callback: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  const callbackRef = React.useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return React.useCallback((...args: TArgs): TResult => {
    return callbackRef.current(...args);
  }, []);
}