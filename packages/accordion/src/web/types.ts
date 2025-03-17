import type {
  Content,
  Header,
  Item,
  AccordionMultipleProps as MultipleProps,
  Root,
  AccordionSingleProps as SingleProps,
  Trigger,
} from '@radix-ui/react-accordion';

type RootProps = React.ComponentProps<typeof Root> & {
  collapsible?: boolean;
};

type RootPropsWebOnly = React.ComponentPropsWithRef<'div'>;

type ItemProps = React.ComponentProps<typeof Item>;
type ItemPropsWebOnly = React.ComponentPropsWithRef<'div'>;

type HeaderProps = React.ComponentProps<typeof Header>;
type HeaderPropsWebOnly = React.ComponentPropsWithRef<'h1'>;

type TriggerPropsWebOnly = React.ComponentPropsWithRef<'button'>;
type TriggerRef = React.ComponentRef<typeof Trigger> & { press: () => void };
type TriggerProps = Omit<React.ComponentProps<typeof Trigger>, 'ref'> & { ref?: TriggerRef };

type ContentProps = React.ComponentProps<typeof Content>;
type ContentPropsWebOnly = React.ComponentPropsWithRef<'div'>;

export type {
  ContentProps,
  ContentPropsWebOnly,
  HeaderProps,
  HeaderPropsWebOnly,
  ItemProps,
  ItemPropsWebOnly,
  MultipleProps,
  RootProps,
  RootPropsWebOnly,
  SingleProps,
  TriggerProps,
  TriggerPropsWebOnly,
  TriggerRef,
};
