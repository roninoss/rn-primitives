import * as React from 'react';

interface AugmentRefProps<T> {
  ref: React.Ref<T>;
  methods?: Record<string, (...args: any[]) => any>;
  // TODO: remove this
  deps?: any[];
}

export function useAugmentedRef<T>({ ref, methods, deps = [] }: AugmentRefProps<T>) {
  const augmentedRef = React.useRef<T>(null);
  React.useImperativeHandle(
    ref,
    () => {
      return {
        ...augmentedRef.current,
        ...methods,
      } as T;
    },
    [augmentedRef.current, methods]
  );
  return augmentedRef;
}
