import type {
  Content,
  Header,
  Item,
  AccordionMultipleProps as MultipleProps,
  Root,
  AccordionSingleProps as SingleProps,
  Trigger,
} from '@radix-ui/react-accordion';

type RootProps = React.ComponentPropsWithoutRef<typeof Root> & {
  collapsible?: boolean;
};
type RootPropsWebOnly = React.ComponentPropsWithRef<'div'>;
type RootRef = React.ElementRef<typeof Root>;

type ItemProps = React.ComponentPropsWithoutRef<typeof Item>;
type ItemPropsWebOnly = React.ComponentPropsWithRef<'div'>;
type ItemRef = React.ElementRef<typeof Item>;

type HeaderProps = React.ComponentPropsWithoutRef<typeof Header>;
type HeaderPropsWebOnly = React.ComponentPropsWithRef<'h1'>;
type HeaderRef = React.ElementRef<typeof Header>;

type TriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;
type TriggerPropsWebOnly = React.ComponentPropsWithRef<'button'>;
type TriggerRef = React.ElementRef<typeof Trigger> & { press: () => void };

type ContentProps = React.ComponentPropsWithoutRef<typeof Content>;
type ContentPropsWebOnly = React.ComponentPropsWithRef<'div'>;
type ContentRef = React.ElementRef<typeof Content>;

export type {
  ContentProps,
  ContentPropsWebOnly,
  ContentRef,
  HeaderProps,
  HeaderPropsWebOnly,
  HeaderRef,
  ItemProps,
  ItemPropsWebOnly,
  ItemRef,
  MultipleProps,
  RootProps,
  RootPropsWebOnly,
  RootRef,
  SingleProps,
  TriggerProps,
  TriggerPropsWebOnly,
  TriggerRef,
};
