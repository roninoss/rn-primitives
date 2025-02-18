import type { AnimatablePressableProps, AnimatableViewProps } from '@rn-primitives/animatable';
import type { PressableRef, ViewRef } from '@rn-primitives/types';
import type {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionRootProps,
  BaseAccordionTriggerProps,
  BaseAccordionTriggerRef,
} from './base';

type AccordionContentNativeOnlyProps = AnimatableViewProps;
type AccordionContentNativeOnlyRef = ViewRef;
type AccordionHeaderNativeOnlyProps = AnimatableViewProps;
type AccordionHeaderNativeOnlyRef = ViewRef;
type AccordionItemNativeOnlyProps = AnimatableViewProps;
type AccordionItemNativeOnlyRef = ViewRef;
type AccordionRootNativeOnlyProps = AnimatableViewProps;
type AccordionRootNativeOnlyRef = ViewRef;
type AccordionTriggerNativeOnlyProps = AnimatablePressableProps;
type AccordionTriggerNativeOnlyRef = PressableRef;

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
