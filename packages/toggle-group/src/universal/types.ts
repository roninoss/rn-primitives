import type { PressablePropsUniversal, ViewPropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type { BaseItemProps, BaseRootProps } from '../base-types';
import type { ItemPropsNativeOnly, RootPropsNativeOnly } from '../native/types';
import type { ItemPropsWebOnly, RootPropsWebOnly } from '../web/types';

type RootProps = Prettify<
  BaseRootProps &
    ViewPropsUniversal & {
      native?: RootPropsNativeOnly;
      web?: RootPropsWebOnly;
    }
>;

type ItemProps = Prettify<
  BaseItemProps &
    PressablePropsUniversal & {
      native?: ItemPropsNativeOnly;
      web?: ItemPropsWebOnly;
    }
>;

export type { ItemProps, RootProps };
