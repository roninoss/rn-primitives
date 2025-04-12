import type { PressablePropsUniversal, ViewPropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type { BaseCheckboxIndicatorProps, BaseCheckboxRootProps } from '../base-types';
import type { IndicatorPropsNativeOnly, RootPropsNativeOnly } from '../native/types';
import type { IndicatorPropsWebOnly, RootPropsWebOnly } from '../web/types';

type RootProps = Prettify<
  BaseCheckboxRootProps &
    PressablePropsUniversal & {
      native?: RootPropsNativeOnly;
      web?: RootPropsWebOnly;
    }
>;

type IndicatorProps = Prettify<
  BaseCheckboxIndicatorProps &
    ViewPropsUniversal & {
      native?: IndicatorPropsNativeOnly;
      web?: IndicatorPropsWebOnly;
    }
>;

export type { IndicatorProps, RootProps };
