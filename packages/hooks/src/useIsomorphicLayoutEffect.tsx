import * as React from 'react';
import { Platform } from 'react-native';

function useIsomorphicLayoutEffect(
  effect: React.EffectCallback,
  dependencies?: React.DependencyList
) {
  if (Platform.OS === 'web' && typeof window === 'undefined') {
    React.useEffect(effect, dependencies);
  } else {
    React.useLayoutEffect(effect, dependencies);
  }
}

export { useIsomorphicLayoutEffect };
