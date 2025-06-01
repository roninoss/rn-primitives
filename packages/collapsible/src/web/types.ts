import type {
  CollapsibleContentProps,
  CollapsibleProps,
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
  ContentProps,
  ContentPropsWebOnly,
  RootProps,
  RootPropsWebOnly,
  TriggerProps,
  TriggerPropsWebOnly,
  TriggerRef,
};
