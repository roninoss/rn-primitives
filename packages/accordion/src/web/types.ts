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
type RootRef = React.ElementRef<typeof Root>;
type ItemProps = React.ComponentPropsWithoutRef<typeof Item>;
type ItemRef = React.ElementRef<typeof Item>;
type HeaderProps = React.ComponentPropsWithoutRef<typeof Header>;
type HeaderRef = React.ElementRef<typeof Header>;
type TriggerProps = React.ComponentPropsWithoutRef<typeof Trigger>;
type TriggerRef = React.ElementRef<typeof Trigger> & { press: () => void };
type ContentProps = React.ComponentPropsWithoutRef<typeof Content>;
type ContentRef = React.ElementRef<typeof Content>;

export type {
  ContentProps,
  ContentRef,
  HeaderProps,
  HeaderRef,
  ItemProps,
  ItemRef,
  MultipleProps,
  RootProps,
  RootRef,
  SingleProps,
  TriggerProps,
  TriggerRef,
};
