import type { ViewProps } from '@rn-primitives/core/dist/native';
import type { Prettify } from '@rn-primitives/types';
import type { BaseRootProps } from '../base-types';

type RootProps = Prettify<ViewProps & BaseRootProps>;
type RootPropsNativeOnly = ViewProps;

export type { RootProps, RootPropsNativeOnly };
