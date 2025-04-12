import { Checkbox, CheckboxIndicator } from '@radix-ui/react-checkbox';
import { withRNPrimitives } from '@rn-primitives/utils';

const Root = withRNPrimitives(Checkbox, 'pressable');
const Indicator = withRNPrimitives(CheckboxIndicator, 'view');

export { Indicator, Root };
