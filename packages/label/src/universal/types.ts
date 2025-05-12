import { PressablePropsUniversal, TextPropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps, BaseTextProps } from '../base-types';
import type { RootPropsNativeOnly, TextPropsNativeOnly } from '../native/types';
import type { RootPropsWebOnly, TextPropsWebOnly } from '../web/types';

type RootProps = Prettify<
  BaseRootProps &
    Omit<PressablePropsUniversal, 'children' | 'hitSlop' | 'style'> & {
      native?: RootPropsNativeOnly;
      web?: RootPropsWebOnly;
    }
>;

type TextProps = Prettify<
  BaseTextProps & TextPropsUniversal & { native?: TextPropsNativeOnly; web?: TextPropsWebOnly }
>;

export type { RootProps, TextProps };
