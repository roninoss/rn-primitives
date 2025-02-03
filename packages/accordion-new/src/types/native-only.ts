import type { PressableRef, ViewRef } from '@rn-primitives/types';
import type { AnimatablePressableProps, AnimatableViewProps } from '@rn-primitives/animatable';

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
};
