import { Progress, ProgressIndicator } from '@radix-ui/react-progress';
import { withRNPrimitives } from '@rn-primitives/utils';

const Root = withRNPrimitives(Progress, 'view');
const Indicator = withRNPrimitives(ProgressIndicator, 'view');

export { Indicator, Root };
