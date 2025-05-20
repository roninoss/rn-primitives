import type {
  CollapsibleProps,
  CollapsibleContentProps,
  CollapsibleTriggerProps,
} from '@radix-ui/react-collapsible';

type RootProps = CollapsibleProps;

type RootPropsWebOnly = React.ComponentProps<'div'>;

type TriggerPropsWebOnly = React.ComponentProps<'button'>;
type TriggerRef = CollapsibleTriggerProps & { press: () => void };
type TriggerProps = Omit<CollapsibleTriggerProps, 'ref'> & { ref?: TriggerRef };

type ContentProps = CollapsibleContentProps;
type ContentPropsWebOnly = React.ComponentProps<'div'>;

export type {
  RootProps,
  RootPropsWebOnly,
  TriggerProps,
  TriggerPropsWebOnly,
  TriggerRef,
  ContentProps,
  ContentPropsWebOnly,
};
