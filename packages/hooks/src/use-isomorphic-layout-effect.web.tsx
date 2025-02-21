import * as React from 'react';

function useIsomorphicLayoutEffect(
  effect: React.EffectCallback,
  dependencies?: React.DependencyList
) {
  if (typeof window === 'undefined') {
    React.useEffect(effect, dependencies);
  } else {
    React.useLayoutEffect(effect, dependencies);
  }
}

export { useIsomorphicLayoutEffect };
