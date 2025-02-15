import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Content,
  Header,
} from '@radix-ui/react-accordion';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import type {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionMultipleProps,
  BaseAccordionRootProps,
  BaseAccordionSingleProps,
  BaseAccordionTriggerProps,
  BaseAccordionTriggerRef,
} from './types/base';
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
} from './types/web-only';
import {
  RootContext,
  createItemContext,
  createUseItemContext,
  useRootContext,
} from './utils/contexts';
import { getDefaultValue } from './utils/get-default-value';
import { isItemExpanded } from './utils/is-item-expanded';

type AccordionRootWebProps = BaseAccordionRootProps & AccordionRootWebOnlyProps;
type AccordionRootWebRef = AccordionRootWebOnlyRef;

const Root = React.forwardRef<AccordionRootWebRef, AccordionRootWebProps>(
  (
    { value: valueProp, onValueChange: onValueChangeProps, defaultValue, collapsible, ...props },
    ref
  ) => {
    const [rootValue = props.type === 'multiple' ? [] : undefined, onRootValueChange] =
      useControllableState<(string | undefined) | string[]>({
        prop: valueProp,
        defaultProp: getDefaultValue(defaultValue, props.type),
        onChange: onValueChangeProps as (state: string | string[] | undefined) => void,
      });

    return (
      <RootContext.Provider
        value={{
          type: props.type,
          disabled: props.disabled,
          collapsible: collapsible,
          rootValue,
          onRootValueChange,
          dir: props.dir,
          orientation: props.orientation,
        }}
      >
        <Accordion
          ref={ref}
          {...({
            ...props,
            value: rootValue,
            onValueChange: onRootValueChange,
            collapsible: collapsible?.toString(),
          } as BaseAccordionSingleProps | BaseAccordionMultipleProps)}
        />
      </RootContext.Provider>
    );
  }
);

Root.displayName = 'AccordionRootWeb';

const AccordionItemContext = createItemContext();
const useItemContext = createUseItemContext(AccordionItemContext);

type AccordionItemWebProps = BaseAccordionItemProps & AccordionItemWebOnlyProps;
type AccordionItemWebRef = AccordionItemWebOnlyRef;

const Item = React.forwardRef<AccordionItemWebRef, AccordionItemWebProps>((props, ref) => {
  const { rootValue } = useRootContext();

  return (
    <AccordionItemContext.Provider
      value={{
        itemValue: props.value,
        disabled: props.disabled,
        isExpanded: isItemExpanded(rootValue, props.value),
      }}
    >
      <AccordionItem ref={ref} {...props} />
    </AccordionItemContext.Provider>
  );
});

Item.displayName = 'AccordionItemWeb';

type AccordionHeaderWebProps = BaseAccordionHeaderProps & AccordionHeaderWebOnlyProps;
type AccordionHeaderWebRef = AccordionHeaderWebOnlyRef;

type AccordionTriggerWebProps = BaseAccordionTriggerProps & AccordionTriggerWebOnlyProps;
type AccordionTriggerWebRef = AccordionTriggerWebOnlyRef & BaseAccordionTriggerRef;

const Trigger = React.forwardRef<AccordionTriggerWebRef, AccordionTriggerWebProps>((props, ref) => {
  const triggerRef = React.useRef<AccordionTriggerWebRef>(null);

  React.useImperativeHandle(
    ref,
    () =>
      triggerRef.current
        ? {
            ...triggerRef.current,
            trigger: () => {
              triggerRef.current?.click();
            },
          }
        : ({} as AccordionTriggerWebRef),
    []
  );

  return <AccordionTrigger ref={triggerRef} {...props} />;
});

Trigger.displayName = 'AccordionTriggerWeb';

type AccordionContentWebProps = BaseAccordionContentProps & AccordionContentWebOnlyProps;
type AccordionContentWebRef = AccordionContentWebOnlyRef;

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };

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
