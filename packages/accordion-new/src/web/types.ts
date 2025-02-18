import type { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion';
import type { PropsWithout } from '@rn-primitives/types';
import type {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionRootProps,
  BaseAccordionTriggerProps,
  BaseAccordionTriggerRef,
} from '../base-types';

type AccordionRootWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Root>,
  BaseAccordionRootProps
>;
type AccordionRootWebOnlyRef = React.ElementRef<typeof Root>;

type AccordionContentWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Content>,
  BaseAccordionContentProps
>;
type AccordionContentWebOnlyRef = React.ElementRef<typeof Content>;

type AccordionHeaderWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Header>,
  BaseAccordionHeaderProps
>;
type AccordionHeaderWebOnlyRef = React.ElementRef<typeof Header>;

type AccordionItemWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Item>,
  BaseAccordionItemProps
>;
type AccordionItemWebOnlyRef = React.ElementRef<typeof Item>;

type AccordionTriggerWebOnlyProps = PropsWithout<
  React.ComponentPropsWithoutRef<typeof Trigger>,
  BaseAccordionTriggerProps
>;
type AccordionTriggerWebOnlyRef = React.ElementRef<typeof Trigger>;

type RootProps = BaseAccordionRootProps & AccordionRootWebOnlyProps;
type RootRef = AccordionRootWebOnlyRef;
type ItemProps = BaseAccordionItemProps & AccordionItemWebOnlyProps;
type ItemRef = AccordionItemWebOnlyRef;
type HeaderProps = BaseAccordionHeaderProps & AccordionHeaderWebOnlyProps;
type HeaderRef = AccordionHeaderWebOnlyRef;
type TriggerProps = BaseAccordionTriggerProps & AccordionTriggerWebOnlyProps;
type TriggerRef = AccordionTriggerWebOnlyRef & BaseAccordionTriggerRef;
type ContentProps = BaseAccordionContentProps & AccordionContentWebOnlyProps;
type ContentRef = AccordionContentWebOnlyRef;

export type {
  AccordionContentWebOnlyProps,
  AccordionContentWebOnlyRef,
  AccordionHeaderWebOnlyProps,
  AccordionHeaderWebOnlyRef,
  AccordionItemWebOnlyProps,
  AccordionItemWebOnlyRef,
  AccordionRootWebOnlyProps,
  AccordionRootWebOnlyRef,
  AccordionTriggerWebOnlyProps,
  AccordionTriggerWebOnlyRef,
  ContentProps,
  ContentRef,
  HeaderProps,
  HeaderRef,
  ItemProps,
  ItemRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
