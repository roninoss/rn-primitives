import type { PressableProps, ViewProps } from '@rn-primitives/core/dist/native';
import type { Prettify } from '@rn-primitives/types';
import type { BaseItemProps, BaseRootProps } from '../base-types';

type ItemProps = Prettify<PressableProps & BaseItemProps>;
type ItemPropsNativeOnly = PressableProps;

type RootProps = Prettify<ViewProps & BaseRootProps>;
type RootPropsNativeOnly = ViewProps;

export type { ItemProps, ItemPropsNativeOnly, RootProps, RootPropsNativeOnly };
