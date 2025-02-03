import type { SlottableImageProps, SlottableViewProps, ViewRef } from '@rn-primitives/types';
import type { Image } from 'react-native';

type RootProps = SlottableViewProps & {
  alt: string;
};

type ImageProps = Omit<SlottableImageProps, 'alt'> & {
  onLoadingStatusChange?: (status: 'error' | 'loaded') => void;
};

type FallbackProps = SlottableViewProps;

type RootRef = ViewRef;
type ImageRef = React.ElementRef<typeof Image>;
type FallbackRef = ViewRef;

export type { FallbackProps, FallbackRef, ImageProps, ImageRef, RootProps, RootRef };
