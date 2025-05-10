import type { RootProps as RootPropsWeb } from './web/types';

type BaseRootProps = Pick<RootPropsWeb, 'orientation' | 'decorative'>;

export type { BaseRootProps };
