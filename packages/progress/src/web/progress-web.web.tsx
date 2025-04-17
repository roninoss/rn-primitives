import { Progress, ProgressIndicator } from '@radix-ui/react-progress';
import type { RootProps, IndicatorProps } from './types';

function Root(props: RootProps) {
  return <Progress data-rn-primitives='view' {...props} />;
}

function Indicator(props: IndicatorProps) {
  return <ProgressIndicator data-rn-primitives='view' {...props} />;
}

export { Root, Indicator };
