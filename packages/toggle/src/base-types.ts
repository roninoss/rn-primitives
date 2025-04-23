import type { RootProps as RootPropsWeb } from './web/types';

type BaseRootProps = Pick<
  RootPropsWeb,
  'defaultPressed' | 'pressed' | 'onPressedChange' | 'disabled' | 'asChild'
>;

export type { BaseRootProps };
