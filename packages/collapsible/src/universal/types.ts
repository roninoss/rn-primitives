import type { PressablePropsUniversal, ViewPropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type { BaseContentProps, BaseRootProps, BaseTriggerProps } from '../base-types';
import type {
  ContentPropsNativeOnly,
  RootPropsNativeOnly,
  TriggerPropsNativeOnly,
} from '../native/types';
import type { ContentPropsWebOnly, RootPropsWebOnly, TriggerPropsWebOnly } from '../web/types';

type RootProps = Prettify<
  BaseRootProps &
    ViewPropsUniversal & {
      native?: RootPropsNativeOnly;
      web?: RootPropsWebOnly;
    }
>;

type ContentProps = Prettify<
  BaseContentProps &
    ViewPropsUniversal & {
      native?: ContentPropsNativeOnly;
      web?: ContentPropsWebOnly;
    }
>;

type TriggerProps = Prettify<
  BaseTriggerProps &
    PressablePropsUniversal & {
      native?: TriggerPropsNativeOnly;
      web?: TriggerPropsWebOnly;
    }
>;

type TriggerRef = TriggerProps['ref'];

export type { ContentProps, RootProps, TriggerProps, TriggerRef };
