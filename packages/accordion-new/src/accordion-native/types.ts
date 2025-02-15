import type {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionRootProps,
  BaseAccordionTriggerProps,
  BaseAccordionTriggerRef,
} from '../types/base';
import type {
  AccordionContentNativeOnlyProps,
  AccordionContentNativeOnlyRef,
  AccordionHeaderNativeOnlyProps,
  AccordionHeaderNativeOnlyRef,
  AccordionItemNativeOnlyProps,
  AccordionItemNativeOnlyRef,
  AccordionRootNativeOnlyProps,
  AccordionRootNativeOnlyRef,
  AccordionTriggerNativeOnlyProps,
  AccordionTriggerNativeOnlyRef,
} from '../types/native-only';

type RootProps = AccordionRootNativeOnlyProps & BaseAccordionRootProps;
type RootRef = AccordionRootNativeOnlyRef;
type ItemProps = AccordionItemNativeOnlyProps & BaseAccordionItemProps;
type ItemRef = AccordionItemNativeOnlyRef;
type HeaderProps = AccordionHeaderNativeOnlyProps & BaseAccordionHeaderProps;
type HeaderRef = AccordionHeaderNativeOnlyRef;
type TriggerProps = AccordionTriggerNativeOnlyProps & BaseAccordionTriggerProps;
type TriggerRef = AccordionTriggerNativeOnlyRef & BaseAccordionTriggerRef;
type ContentProps = AccordionContentNativeOnlyProps & BaseAccordionContentProps;
type ContentRef = AccordionContentNativeOnlyRef;

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
