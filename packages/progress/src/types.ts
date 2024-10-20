import { SlottableViewProps } from '@rn-primitives/types';

type ProgressRootProps = SlottableViewProps & {
  value?: number | null | undefined;
  max?: number;
  getValueLabel?(value: number, max: number): string;
};

type ProgressIndicatorProps = SlottableViewProps;

export type { ProgressIndicatorProps, ProgressRootProps };
