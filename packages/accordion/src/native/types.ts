import type { PressableProps, ViewProps } from '@rn-primitives/core/dist/native';
import type { Prettify } from '@rn-primitives/types';
import type {
  BaseContentProps,
  BaseHeaderProps,
  BaseItemProps,
  BaseRootProps,
  BaseTriggerProps,
} from '../base-types';

type RootProps = Prettify<ViewProps & BaseRootProps>;
type RootPropsNativeOnly = ViewProps;

type ItemProps = Prettify<ViewProps & BaseItemProps>;
type ItemPropsNativeOnly = ViewProps;

type HeaderProps = Prettify<ViewProps & BaseHeaderProps>;
type HeaderPropsNativeOnly = ViewProps;

type TriggerProps = Prettify<PressableProps & BaseTriggerProps>;
type TriggerPropsNativeOnly = PressableProps;

type ContentProps = Prettify<ViewProps & BaseContentProps>;
type ContentPropsNativeOnly = ViewProps;

export type {
  ContentProps,
  ContentPropsNativeOnly,
  HeaderProps,
  HeaderPropsNativeOnly,
  ItemProps,
  ItemPropsNativeOnly,
  RootProps,
  RootPropsNativeOnly,
  TriggerProps,
  TriggerPropsNativeOnly,
};
