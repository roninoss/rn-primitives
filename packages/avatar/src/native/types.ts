import type { ImageProps as RNPImageProps, ViewProps } from '@rn-primitives/core/dist/native';
import type {
  BaseAvatarFallbackProps,
  BaseAvatarImageProps,
  BaseAvatarRootProps,
} from '../base-types';

type RootPropsNativeOnly = ViewProps;
type ImagePropsNativeOnly = RNPImageProps;
type FallbackPropsNativeOnly = ViewProps;

type RootProps = RootPropsNativeOnly & BaseAvatarRootProps;
type ImageProps = ImagePropsNativeOnly & {
  onLoadingStatusChange?: BaseAvatarImageProps['onLoadingStatusChange'];
};
type FallbackProps = FallbackPropsNativeOnly & BaseAvatarFallbackProps;

export type {
  FallbackProps,
  FallbackPropsNativeOnly,
  ImageProps,
  ImagePropsNativeOnly,
  RootProps,
  RootPropsNativeOnly,
};
