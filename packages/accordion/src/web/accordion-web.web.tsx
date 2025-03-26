import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Content,
  Header,
} from '@radix-ui/react-accordion';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import { ItemContext, RootContext, useItemContext, useRootContext } from '../utils/contexts';
import { getDefaultValue } from '../utils/get-default-value';
import { isItemExpanded } from '../utils/is-item-expanded';
import type { ItemProps, MultipleProps, RootProps, SingleProps, TriggerProps } from './types';

function Root({
  value: valueProp,
  onValueChange: onValueChangeProps,
  defaultValue,
  collapsible,
  ...props
}: RootProps) {
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
      }}
    >
      <Accordion
        {...({
          ...props,
          value: rootValue,
          defaultValue,
          onValueChange: onRootValueChange,
          collapsible: collapsible?.toString(), // fixes radix-ui/accordion console error
        } as SingleProps | MultipleProps)}
      />
    </RootContext.Provider>
  );
}

function Item(props: ItemProps) {
  const { rootValue } = useRootContext();

  return (
    <ItemContext.Provider
      value={{
        itemValue: props.value,
        disabled: props.disabled,
        isExpanded: isItemExpanded(rootValue, props.value),
      }}
    >
      <AccordionItem {...props} />
    </ItemContext.Provider>
  );
}

function Trigger({ ref, ...props }: TriggerProps) {
  return <AccordionTrigger ref={ref as React.Ref<HTMLButtonElement> | undefined} {...props} />;
}

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
