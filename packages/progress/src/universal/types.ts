import type { ViewPropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type { BaseIndicatorProps, BaseRootProps } from '../base-types';
import type { IndicatorPropsNativeOnly, RootPropsNativeOnly } from '../native/types';
import type { IndicatorPropsWebOnly, RootPropsWebOnly } from '../web/types';

type BaseWithPlatformProps<B, N, W> = Prettify<
  B & {
    native?: N;
    web?: W;
  }
>;

type RootProps = BaseWithPlatformProps<BaseRootProps, RootPropsNativeOnly, RootPropsWebOnly> &
  ViewPropsUniversal;

type IndicatorProps = BaseWithPlatformProps<
  BaseIndicatorProps,
  IndicatorPropsNativeOnly,
  IndicatorPropsWebOnly
> &
  ViewPropsUniversal;

export type { IndicatorProps, RootProps };
