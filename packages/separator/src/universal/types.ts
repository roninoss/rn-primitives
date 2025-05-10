import { ViewPropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps } from '../base-types';
import type { RootPropsNativeOnly } from '../native/types';
import type { RootPropsWebOnly } from '../web/types';

type RootProps = Prettify<
  BaseRootProps &
    ViewPropsUniversal & {
      native?: RootPropsNativeOnly;
      web?: RootPropsWebOnly;
    }
>;

export type { RootProps };
