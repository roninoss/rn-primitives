import type { RootProps as RootPropsWeb } from './web/types';

type BaseToggleRootProps = Pick<
  RootPropsWeb,
  'defaultPressed' | 'pressed' | 'onPressedChange' | 'disabled'
>;

export type { BaseToggleRootProps };
