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
  ContentPropsNativeOnly,
  HeaderPropsNativeOnly,
  ItemPropsNativeOnly,
  RootPropsNativeOnly,
  TriggerPropsNativeOnly,
} from '../native/types';
import type {
  ContentPropsWebOnly,
  HeaderPropsWebOnly,
  ItemPropsWebOnly,
  RootPropsWebOnly,
  TriggerPropsWebOnly,
} from '../web/types';

type BaseWithPlatformProps<B, N, W> = Prettify<
  B & {
    native?: N;
    web?: W;
  }
>;

type ContentProps = BaseWithPlatformProps<
  BaseContentProps,
  ContentPropsNativeOnly,
  ContentPropsWebOnly
> &
  ViewPropsUniversal;

type HeaderProps = BaseWithPlatformProps<
  BaseHeaderProps,
  HeaderPropsNativeOnly,
  HeaderPropsWebOnly
> &
  ViewPropsUniversal;

type ItemProps = BaseWithPlatformProps<BaseItemProps, ItemPropsNativeOnly, ItemPropsWebOnly> &
  ViewPropsUniversal;

type RootProps = BaseWithPlatformProps<BaseRootProps, RootPropsNativeOnly, RootPropsWebOnly> &
  ViewPropsUniversal;

type TriggerProps = BaseWithPlatformProps<
  BaseTriggerProps,
  TriggerPropsNativeOnly,
  TriggerPropsWebOnly
> &
  PressablePropsUniversal;

type TriggerRef = PressableRefUniversal;

export type { ContentProps, HeaderProps, ItemProps, RootProps, TriggerProps, TriggerRef };
