import { ViewPropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps, BaseIndicatorProps } from '../base-types';
import type { RootPropsNativeOnly, IndicatorPropsNativeOnly } from '../native/types';
import type { RootPropsWebOnly, IndicatorPropsWebOnly } from '../web/types';

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

export type { RootProps, IndicatorProps };
