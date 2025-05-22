import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { withRNPrimitives } from '@rn-primitives/utils';
import type { TriggerProps } from './types';

const Root = withRNPrimitives(Collapsible, 'view');

function Trigger({ ref, ...props }: TriggerProps) {
  return (
    <CollapsibleTrigger
      ref={ref as React.Ref<HTMLButtonElement> | undefined}
      data-rn-primitives='pressable'
      {...props}
    />
  );
}

const Content = withRNPrimitives(CollapsibleContent, 'view');

export { Content, Root, Trigger };
