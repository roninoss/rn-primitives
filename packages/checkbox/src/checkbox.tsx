import { Slot } from '@rn-primitives/slot';
import type { PressableRef, SlottablePressableProps } from '@rn-primitives/types';
import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import type { IndicatorProps, IndicatorRef, RootProps, RootRef } from './types';

const CheckboxContext = React.createContext<RootProps | null>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  disabled = false,
  checked,
  onCheckedChange,
  ref,
  ...props
}: RootComponentProps) => {
  return (
    <CheckboxContext.Provider
      value={{
        disabled,
        checked,
        onCheckedChange,
      }}
    >
      <Trigger ref={ref} {...props} />
    </CheckboxContext.Provider>
  );
};

Root.displayName = 'RootNativeCheckbox';

function useCheckboxContext() {
  const context = React.useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      'Checkbox compound components cannot be rendered outside the Checkbox component'
    );
  }
  return context;
}
type TriggerComponentProps = SlottablePressableProps & React.RefAttributes<PressableRef>;

const Trigger = ({ asChild, onPress: onPressProp, ref, ...props }: TriggerComponentProps) => {
  const { disabled, checked, onCheckedChange } = useCheckboxContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    const newValue = !checked;
    onCheckedChange(newValue);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled}
      role='checkbox'
      aria-checked={checked}
      onPress={onPress}
      accessibilityState={{
        checked,
        disabled,
      }}
      disabled={disabled}
      {...props}
    />
  );
};

Trigger.displayName = 'TriggerNativeCheckbox';
type IndicatorComponentProps = IndicatorProps & React.RefAttributes<IndicatorRef>;

const Indicator = ({ asChild, forceMount, ref, ...props }: IndicatorComponentProps) => {
  const { checked, disabled } = useCheckboxContext();

  if (!forceMount) {
    if (!checked) {
      return null;
    }
  }

  const Component = asChild ? Slot : View;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled}
      aria-hidden={!(forceMount || checked)}
      role={'presentation'}
      {...props}
    />
  );
};

Indicator.displayName = 'IndicatorNativeCheckbox';

export { Indicator, Root };
