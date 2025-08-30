import type { SlottableViewPropsWithRef, ViewRef } from '@rn-primitives/types';

type RootProps = SlottableViewPropsWithRef & {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
};

type RootRef = ViewRef;

export type { RootProps, RootRef };
