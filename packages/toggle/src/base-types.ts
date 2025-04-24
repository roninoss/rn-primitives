import type { RootProps as RootPropsWeb } from './web/types';

type BaseToggleRootProps = Pick<
  RootPropsWeb,
  'defaultPressed' | 'pressed' | 'onPressedChange' | 'disabled' | 'asChild'
>;

export type { BaseToggleRootProps };
