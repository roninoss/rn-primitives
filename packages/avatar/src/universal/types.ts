import type { ImagePropsUniversal, ViewPropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type {
  BaseAvatarFallbackProps,
  BaseAvatarImageProps,
  BaseAvatarRootProps,
} from '../base-types';
import type {
  FallbackPropsNativeOnly,
  ImagePropsNativeOnly,
  RootPropsNativeOnly,
} from '../native/types';
import type { FallbackPropsWebOnly, ImagePropsWebOnly, RootPropsWebOnly } from '../web/types';

type FallbackProps = Prettify<
  BaseAvatarFallbackProps &
    ViewPropsUniversal & {
      native?: FallbackPropsNativeOnly;
      web?: FallbackPropsWebOnly;
    }
>;

type RootProps = Prettify<
  BaseAvatarRootProps &
    ViewPropsUniversal & {
      native?: RootPropsNativeOnly;
      web?: RootPropsWebOnly;
    }
>;

type ImageProps = Prettify<
  BaseAvatarImageProps &
    ImagePropsUniversal & {
      native?: ImagePropsNativeOnly;
      web?: ImagePropsWebOnly;
    }
>;

export type { FallbackProps, ImageProps, RootProps };
