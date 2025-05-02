import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { useControllableState } from '@rn-primitives/hooks';
import { ItemContext, RootContext, useItemContext, useRootContext } from '../utils/contexts';
import { getDefaultValue } from '../utils/get-default-value';
import type { ItemProps, RootProps, MultipleProps, SingleProps } from './types';

const Root = ({
  value: valueProp,
  onValueChange: onValueChangeProps,
  defaultValue,
  ...props
}: RootProps) => {
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
        value: rootValue,
        onValueChange: onRootValueChange,
      }}
    >
      <ToggleGroup
        data-rn-primitives='view'
        {...({
          ...props,
          value: rootValue,
          defaultValue,
          onValueChange: onRootValueChange,
        } as SingleProps | MultipleProps)}
      />
    </RootContext.Provider>
  );
};

const Item = ({ value: itemValue, ...props }: ItemProps) => {
  return (
    <ItemContext.Provider value={{ value: itemValue }}>
      <ToggleGroupItem data-rn-primitives='pressable' value={itemValue} {...props} />
    </ItemContext.Provider>
  );
};

export { Item, Root, useItemContext, useRootContext };
