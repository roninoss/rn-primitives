import type { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion';
import type {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionRootProps,
  BaseAccordionTriggerProps,
} from './base';
import type { PropsWithout } from '@rn-primitives/types';

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
};
