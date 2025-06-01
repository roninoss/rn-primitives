import { ViewPropsUniversal, PressablePropsUniversal } from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps, BaseContentProps, BaseTriggerProps } from '../base-types';
import type {
  RootPropsNativeOnly,
  ContentPropsNativeOnly,
  TriggerPropsNativeOnly,
} from '../native/types';
import type { RootPropsWebOnly, ContentPropsWebOnly, TriggerPropsWebOnly } from '../web/types';

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

export type { RootProps, ContentProps, TriggerProps, TriggerRef };
