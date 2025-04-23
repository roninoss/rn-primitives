import type { PressableProps } from '@rn-primitives/core/dist/native';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps } from '../base-types';

type RootProps = Prettify<PressableProps & BaseRootProps>;
type RootPropsNativeOnly = PressableProps;

export type { RootProps, RootPropsNativeOnly };
