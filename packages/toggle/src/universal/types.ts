import { PressablePropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps } from '../base-types';
import type { RootPropsNativeOnly } from '../native/types';
import type { RootPropsWebOnly } from '../web/types';

type RootProps = Prettify<
  BaseRootProps &
    PressablePropsUniversal & {
      native?: RootPropsNativeOnly;
      web?: RootPropsWebOnly;
    }
>;

type RootRef = RootProps['ref'];

export type { RootProps, RootRef };
