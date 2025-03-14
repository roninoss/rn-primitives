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
type RootRef = ViewRef;
type ItemProps = Prettify<ViewProps & BaseItemProps>;
type ItemRef = ViewRef;
type HeaderProps = Prettify<ViewProps & BaseHeaderProps>;
type HeaderRef = ViewRef;
type TriggerProps = Prettify<PressableProps & BaseTriggerProps>;
type TriggerRef = Prettify<PressableRef & PressableRefUniversal>;
type ContentProps = Prettify<ViewProps & BaseContentProps>;
type ContentRef = ViewRef;

export type {
  ContentProps,
  ContentRef,
  HeaderProps,
  HeaderRef,
  ItemProps,
  ItemRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
