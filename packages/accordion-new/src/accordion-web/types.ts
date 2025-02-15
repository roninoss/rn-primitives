import type {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionRootProps,
  BaseAccordionTriggerProps,
  BaseAccordionTriggerRef,
} from '../types/base';
import type {
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
} from '../types/web-only';

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
