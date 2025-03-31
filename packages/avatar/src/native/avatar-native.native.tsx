import { useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import { View, Image as RNPImage } from '@rn-primitives/core/dist/native';
import * as React from 'react';
import {
  type ImageErrorEventData,
  type ImageLoadEventData,
  type NativeSyntheticEvent,
} from 'react-native';
import type { FallbackProps, ImageProps, RootProps } from './types';

type AvatarState = 'idle' | 'loading' | 'error' | 'loaded';

type IRootContext = RootProps & {
  status: AvatarState;
  setStatus: (status: AvatarState) => void;
};

const RootContext = React.createContext<IRootContext | null>(null);

function Root({ alt, ...props }: RootProps) {
  const [status, setStatus] = React.useState<AvatarState>('idle');
  return (
    <RootContext.Provider value={{ alt, status, setStatus }}>
      <View {...props} />
    </RootContext.Provider>
  );
}

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Avatar compound components cannot be rendered outside the Avatar component');
  }
  return context;
}

function Image({
  ref,
  asChild,
  onLoad: onLoadProps,
  onError: onErrorProps,
  onLoadingStatusChange,
  ...props
}: ImageProps) {
  const { alt, setStatus, status } = useRootContext();

  useIsomorphicLayoutEffect(() => {
    if (status === 'idle' && isValidSource(props.src, props?.source)) {
      setStatus('loading');
      onLoadingStatusChange?.('loading');
    }
  }, [props?.source, status]);

  const onLoad = React.useCallback(
    (e: NativeSyntheticEvent<ImageLoadEventData>) => {
      setStatus('loaded');
      onLoadingStatusChange?.('loaded');
      if (typeof onLoadProps === 'function') {
        onLoadProps(e);
      }
    },
    [onLoadProps]
  );

  const onError = React.useCallback(
    (e: NativeSyntheticEvent<ImageErrorEventData>) => {
      setStatus('error');
      onLoadingStatusChange?.('error');
      if (typeof onErrorProps === 'function') {
        onErrorProps(e);
      }
    },
    [onErrorProps]
  );

  if (status === 'error') {
    return null;
  }

  return <RNPImage alt={alt} onLoad={onLoad} onError={onError} {...props} />;
}

function Fallback({ asChild, delayMs, ...props }: FallbackProps) {
  const { alt, status } = useRootContext();
  const [canShow, setCanShow] = React.useState(delayMs === undefined);

  React.useEffect(() => {
    if (delayMs === undefined) {
      return;
    }
    const timeout = setTimeout(() => {
      setCanShow(true);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [delayMs]);

  if (status === 'loaded' || !canShow) {
    return null;
  }

  return <View aria-label={alt} {...props} />;
}

export { Fallback, Image, Root };

function isValidSource(src?: ImageProps['src'], source?: ImageProps['source']) {
  if (src) {
    return true;
  }
  if (!source) {
    return false;
  }
  // Using require() for the source returns a number
  if (typeof source === 'number') {
    return true;
  }
  if (Array.isArray(source)) {
    return source.some((source) => !!source.uri);
  }
  return !!(source as any)?.uri;
}
