import type { SlottableViewProps } from '@rn-primitives/types';

type SeparatorRootProps = SlottableViewProps & {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
};

export type { SeparatorRootProps };
