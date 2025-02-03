export { Content, Header, Item, Accordion as Root, Trigger } from '@radix-ui/react-accordion';
import {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionRootProps,
  BaseAccordionTriggerProps,
  BaseAccordionTriggerRef,
} from './types/base';
import {
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
} from './types/web-only';

type AccordionContentWebProps = BaseAccordionContentProps & AccordionContentWebOnlyProps;
type AccordionContentWebRef = AccordionContentWebOnlyRef;

type AccordionHeaderWebProps = BaseAccordionHeaderProps & AccordionHeaderWebOnlyProps;
type AccordionHeaderWebRef = AccordionHeaderWebOnlyRef;

type AccordionItemWebProps = BaseAccordionItemProps & AccordionItemWebOnlyProps;
type AccordionItemWebRef = AccordionItemWebOnlyRef;

type AccordionRootWebProps = BaseAccordionRootProps & AccordionRootWebOnlyProps;
type AccordionRootWebRef = AccordionRootWebOnlyRef;

type AccordionTriggerWebProps = BaseAccordionTriggerProps & AccordionTriggerWebOnlyProps;
type AccordionTriggerWebRef = AccordionTriggerWebOnlyRef & BaseAccordionTriggerRef;

export type {
  AccordionContentWebProps as ContentProps,
  AccordionContentWebRef as ContentRef,
  AccordionHeaderWebProps as HeaderProps,
  AccordionHeaderWebRef as HeaderRef,
  AccordionItemWebProps as ItemProps,
  AccordionItemWebRef as ItemRef,
  AccordionRootWebProps as RootProps,
  AccordionRootWebRef as RootRef,
  AccordionTriggerWebProps as TriggerProps,
  AccordionTriggerWebRef as TriggerRef,
};
