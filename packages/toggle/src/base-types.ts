import type { RootProps as RootPropsWeb } from './web/types';

type BaseRootProps = Pick<
  RootPropsWeb,
  'defaultPressed' | 'pressed' | 'onPressedChange' | 'disabled'
>;

export type { BaseRootProps };
