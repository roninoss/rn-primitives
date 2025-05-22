import type { PressableProps, ViewProps } from '@rn-primitives/core/dist/native';
import type { Prettify } from '@rn-primitives/types';
import type { BaseContentProps, BaseRootProps, BaseTriggerProps } from '../base-types';

type RootProps = Prettify<ViewProps & BaseRootProps>;
type RootPropsNativeOnly = ViewProps;

type TriggerProps = Prettify<PressableProps & BaseTriggerProps>;
type TriggerPropsNativeOnly = PressableProps;

type ContentProps = Prettify<ViewProps & BaseContentProps>;
type ContentPropsNativeOnly = ViewProps;

type TriggerRef = TriggerProps['ref'];

export type {
  ContentProps,
  ContentPropsNativeOnly,
  RootProps,
  RootPropsNativeOnly,
  TriggerProps,
  TriggerPropsNativeOnly,
  TriggerRef,
};
