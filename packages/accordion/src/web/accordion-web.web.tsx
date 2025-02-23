import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Content,
  Header,
} from '@radix-ui/react-accordion';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import type { BaseAccordionMultipleProps, BaseAccordionSingleProps } from '../base-types';
import { ItemContext, RootContext, useItemContext, useRootContext } from '../utils/contexts';
import { getDefaultValue } from '../utils/get-default-value';
import { isItemExpanded } from '../utils/is-item-expanded';
import type { ItemProps, ItemRef, RootProps, RootRef, TriggerProps, TriggerRef } from './types';

const Root = React.forwardRef<RootRef, RootProps>(
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
            defaultValue,
            onValueChange: onRootValueChange,
            collapsible: collapsible?.toString(), // fixes radix-ui/accordion console error
          } as BaseAccordionSingleProps | BaseAccordionMultipleProps)}
        />
      </RootContext.Provider>
    );
  }
);

Root.displayName = 'AccordionRootWeb';

const Item = React.forwardRef<ItemRef, ItemProps>((props, ref) => {
  const { rootValue } = useRootContext();

  return (
    <ItemContext.Provider
      value={{
        itemValue: props.value,
        disabled: props.disabled,
        isExpanded: isItemExpanded(rootValue, props.value),
      }}
    >
      <AccordionItem ref={ref} {...props} />
    </ItemContext.Provider>
  );
});

Item.displayName = 'AccordionItemWeb';

const Trigger = React.forwardRef<TriggerRef, TriggerProps>((props, ref) => {
  const triggerRef = React.useRef<TriggerRef>(null);

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
        : ({} as TriggerRef),
    []
  );

  return <AccordionTrigger ref={triggerRef} {...props} />;
});

Trigger.displayName = 'AccordionTriggerWeb';

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
