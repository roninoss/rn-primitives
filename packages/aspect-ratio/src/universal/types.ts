import type { ViewPropsUniversal } from '@rn-primitives/core';
import type { BaseAspectRatioRootProps } from '../base-types';
import type { RootProps as RootPropsNative } from '../native';
import type { RootProps as RootPropsWeb } from '../web';

type RootProps = BaseAspectRatioRootProps &
  ViewPropsUniversal & {
    native?: RootPropsNative;
    web?: RootPropsWeb;
  };

export type { RootProps };
