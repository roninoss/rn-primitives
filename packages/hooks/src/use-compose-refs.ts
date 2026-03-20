import * as React from 'react';

export function useComposedRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return React.useCallback(composeRefs(...refs), refs);
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null): (() => void) | void {
  if (typeof ref === 'function') {
    const cleanup = ref(value);

    if (typeof cleanup === 'function') {
      return cleanup;
    }

    return;
  }

  if (ref != null) {
    ref.current = value;
    return () => {
      ref.current = null;
    };
  }
}

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  let cleanups: Array<() => void> = [];

  return (node) => {
    cleanups.forEach((cleanup) => cleanup());
    cleanups = [];

    if (node == null) {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(null);
        } else if (ref != null) {
          ref.current = null;
        }
      });
      return;
    }

    cleanups = refs
      .map((ref) => setRef(ref, node))
      .filter((cleanup): cleanup is () => void => cleanup != null);
  };
}
