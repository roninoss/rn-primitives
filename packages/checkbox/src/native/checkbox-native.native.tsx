import { Pressable, View } from '@rn-primitives/core/dist/native';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { IndicatorProps, RootProps } from './types';

type CheckboxContextType = RootProps & {
  nativeID?: string;
};

const CheckboxContext = React.createContext<CheckboxContextType | null>(null);

function Root({
  disabled,
  checked: checkedProp,
  onCheckedChange: onCheckedChangeProp,
  nativeID,
  onPress: onPressProp,
  ...props
}: RootProps) {
  const [checked = false, onCheckedChange] = useControllableState({
    prop: checkedProp,
    defaultProp: false,
    onChange: onCheckedChangeProp,
  });

  const onPress = React.useCallback(
    (ev: GestureResponderEvent) => {
      const newValue = !checked;
      onCheckedChange?.(newValue);
      if (typeof onPressProp === 'function') {
        onPressProp(ev);
      }
    },
    [checked, onCheckedChange, onPressProp]
  );

  return (
    <CheckboxContext.Provider
      value={{
        disabled,
        checked,
        onCheckedChange,
        nativeID: nativeID as string | undefined,
      }}
    >
      <Pressable
        nativeID={nativeID as string | undefined}
        aria-disabled={disabled}
        role='checkbox'
        aria-checked={checked}
        onPress={onPress}
        disabled={disabled}
        {...props}
      />
    </CheckboxContext.Provider>
  );
}

function useCheckboxContext() {
  const context = React.useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      'Checkbox compound components cannot be rendered outside the Checkbox component'
    );
  }
  return context;
}

const Indicator = ({ forceMount, ...props }: IndicatorProps) => {
  const { checked, disabled } = useCheckboxContext();

  if (!forceMount) {
    if (!checked) {
      return null;
    }
  }

  return (
    <View
      aria-disabled={disabled}
      aria-hidden={!(forceMount || checked)}
      role='presentation'
      {...props}
    />
  );
};

export { Indicator, Root };
