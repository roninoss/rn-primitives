import {
  PressablePropsUniversal,
  PressableRefUniversal,
  ViewPropsUniversal,
} from '@rn-primitives/core';
import type { Prettify } from '@rn-primitives/types';
import type {
  BaseContentProps,
  BaseHeaderProps,
  BaseItemProps,
  BaseRootProps,
  BaseTriggerProps,
} from '../base-types';
import type {
  ContentProps as ContentPropsNative,
  HeaderProps as HeaderPropsNative,
  ItemProps as ItemPropsNative,
  RootProps as RootPropsNative,
  TriggerProps as TriggerPropsNative,
} from '../native/types';
import type {
  ContentProps as ContentPropsWeb,
  HeaderProps as HeaderPropsWeb,
  ItemProps as ItemPropsWeb,
  RootProps as RootPropsWeb,
  TriggerProps as TriggerPropsWeb,
} from '../web/types';

type ContentProps = Prettify<
  BaseContentProps &
    ViewPropsUniversal & {
      native?: ContentPropsNative;
      web?: ContentPropsWeb;
    }
>;

type HeaderProps = Prettify<
  BaseHeaderProps &
    ViewPropsUniversal & {
      native?: HeaderPropsNative;
      web?: HeaderPropsWeb;
    }
>;

type ItemProps = Prettify<
  BaseItemProps &
    ViewPropsUniversal & {
      native?: ItemPropsNative;
      web?: ItemPropsWeb;
    }
>;

type RootProps = Prettify<
  BaseRootProps &
    ViewPropsUniversal & {
      native?: RootPropsNative;
      web?: RootPropsWeb;
    }
>;

type TriggerProps = Prettify<
  BaseTriggerProps &
    PressablePropsUniversal & {
      native?: TriggerPropsNative;
      web?: TriggerPropsWeb;
    }
>;
type TriggerRef = PressableRefUniversal;

export type { ContentProps, HeaderProps, ItemProps, RootProps, TriggerProps, TriggerRef };
