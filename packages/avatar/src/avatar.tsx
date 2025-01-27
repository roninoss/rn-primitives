import { useIsomorphicLayoutEffect } from '@rnr-method/hooks';
import * as Slot from '@rnr-method/slot';
import * as React from 'react';
import {
  type ImageErrorEventData,
  type ImageLoadEventData,
  type ImageSourcePropType,
  type NativeSyntheticEvent,
  Image as RNImage,
  View,
} from 'react-native';
import type { FallbackProps, FallbackRef, ImageProps, ImageRef, RootProps, RootRef } from './types';

type AvatarState = 'loading' | 'error' | 'loaded';

interface IRootContext extends RootProps {
  status: AvatarState;
  setStatus: (status: AvatarState) => void;
}

const RootContext = React.createContext<IRootContext | null>(null);

const Root = React.forwardRef<RootRef, RootProps>(({ asChild, alt, ...viewProps }, ref) => {
  const [status, setStatus] = React.useState<AvatarState>('error');
  const Component = asChild ? Slot.View : View;
  return (
    <RootContext.Provider value={{ alt, status, setStatus }}>
      <Component ref={ref} {...viewProps} />
    </RootContext.Provider>
  );
});

Root.displayName = 'RootAvatar';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Avatar compound components cannot be rendered outside the Avatar component');
  }
  return context;
}

const Image = React.forwardRef<ImageRef, ImageProps>(
  (
    { asChild, onLoad: onLoadProps, onError: onErrorProps, onLoadingStatusChange, ...props },
    ref
  ) => {
    const { alt, setStatus, status } = useRootContext();

    useIsomorphicLayoutEffect(() => {
      if (isValidSource(props?.source)) {
        setStatus('loading');
      }

      return () => {
        setStatus('error');
      };
    }, [props?.source]);

    const onLoad = React.useCallback(
      (e: NativeSyntheticEvent<ImageLoadEventData>) => {
        setStatus('loaded');
        onLoadingStatusChange?.('loaded');
        onLoadProps?.(e);
      },
      [onLoadProps]
    );

    const onError = React.useCallback(
      (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        setStatus('error');
        onLoadingStatusChange?.('error');
        onErrorProps?.(e);
      },
      [onErrorProps]
    );

    if (status === 'error') {
      return null;
    }

    const Component = asChild ? Slot.Image : RNImage;
    return <Component ref={ref} alt={alt} onLoad={onLoad} onError={onError} {...props} />;
  }
);

Image.displayName = 'ImageAvatar';

const Fallback = React.forwardRef<FallbackRef, FallbackProps>(({ asChild, ...props }, ref) => {
  const { alt, status } = useRootContext();

  if (status !== 'error') {
    return null;
  }
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role={'img'} aria-label={alt} {...props} />;
});

Fallback.displayName = 'FallbackAvatar';

export { Fallback, Image, Root };

function isValidSource(source?: ImageSourcePropType) {
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
  return !!source.uri;
}
