import type { PressableRefUniversal } from '@rn-primitives/core';
import type { PressableProps, ViewProps } from '@rn-primitives/core/dist/native';
import type { PressableRef, Prettify, ViewRef } from '@rn-primitives/types';
import type {
  BaseContentProps,
  BaseHeaderProps,
  BaseItemProps,
  BaseRootProps,
  BaseTriggerProps,
} from '../base-types';

type RootProps = Prettify<ViewProps & BaseRootProps>;
type RootPropsNativeOnly = ViewProps;
type RootRef = ViewRef;

type ItemProps = Prettify<ViewProps & BaseItemProps>;
type ItemPropsNativeOnly = ViewProps;
type ItemRef = ViewRef;

type HeaderProps = Prettify<ViewProps & BaseHeaderProps>;
type HeaderPropsNativeOnly = ViewProps;
type HeaderRef = ViewRef;

type TriggerProps = Prettify<PressableProps & BaseTriggerProps>;
type TriggerPropsNativeOnly = PressableProps;
type TriggerRef = Prettify<PressableRef & PressableRefUniversal>;

type ContentProps = Prettify<ViewProps & BaseContentProps>;
type ContentPropsNativeOnly = ViewProps;
type ContentRef = ViewRef;

export type {
  ContentProps,
  ContentPropsNativeOnly,
  ContentRef,
  HeaderProps,
  HeaderPropsNativeOnly,
  HeaderRef,
  ItemProps,
  ItemPropsNativeOnly,
  ItemRef,
  RootProps,
  RootPropsNativeOnly,
  RootRef,
  TriggerProps,
  TriggerPropsNativeOnly,
  TriggerRef,
};
