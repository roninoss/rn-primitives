import * as Checkbox from '@radix-ui/react-checkbox';
import { useComposedRefs, useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import type { IndicatorProps, IndicatorRef, RootProps, RootRef } from './types';

const CheckboxContext = React.createContext<RootProps | null>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  disabled,
  checked,
  onCheckedChange,
  onPress: onPressProp,
  role: _role,
  ref,
  ...props
}: RootComponentProps) => {
  const rootRef = React.useRef<RootRef>(null);
  const composedRef = useComposedRefs(ref, rootRef);

  function onPress(ev: GestureResponderEvent) {
    onPressProp?.(ev);
    onCheckedChange(!checked);
  }

  useIsomorphicLayoutEffect(() => {
    if (rootRef.current) {
      const augRef = rootRef.current as unknown as HTMLButtonElement;
      augRef.dataset.state = checked ? 'checked' : 'unchecked';
      augRef.value = checked ? 'on' : 'off';
    }
  }, [checked]);

  useIsomorphicLayoutEffect(() => {
    if (rootRef.current) {
      const augRef = rootRef.current as unknown as HTMLButtonElement;
      augRef.type = 'button';
      augRef.role = 'checkbox';

      if (disabled) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [disabled]);

  const Component = asChild ? Slot : Pressable;
  return (
    <CheckboxContext.Provider value={{ checked, disabled, onCheckedChange }}>
      <Checkbox.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        asChild
      >
        <Component
          ref={composedRef}
          role='button'
          onPress={onPress}
          disabled={disabled}
          {...props}
        />
      </Checkbox.Root>
    </CheckboxContext.Provider>
  );
};

Root.displayName = 'RootWebCheckbox';

function useCheckboxContext() {
  const context = React.useContext(CheckboxContext);
  if (context === null) {
    throw new Error(
      'Checkbox compound components cannot be rendered outside the Checkbox component'
    );
  }
  return context;
}
type IndicatorComponentProps = IndicatorProps & React.RefAttributes<IndicatorRef>;

const Indicator = ({ asChild, forceMount, ref, ...props }: IndicatorComponentProps) => {
  const { checked, disabled } = useCheckboxContext();
  const indicatorRef = React.useRef<IndicatorRef>(null);
  const composedRef = useComposedRefs(ref, indicatorRef);

  useIsomorphicLayoutEffect(() => {
    if (indicatorRef.current) {
      const augRef = indicatorRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = checked ? 'checked' : 'unchecked';
    }
  }, [checked]);

  useIsomorphicLayoutEffect(() => {
    if (indicatorRef.current) {
      const augRef = indicatorRef.current as unknown as HTMLDivElement;
      if (disabled) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [disabled]);

  const Component = asChild ? Slot : View;
  return (
    <Checkbox.Indicator forceMount={forceMount} asChild>
      <Component ref={composedRef} {...props} />
    </Checkbox.Indicator>
  );
};

Indicator.displayName = 'IndicatorWebCheckbox';

export { Indicator, Root };
