import * as Checkbox from '@radix-ui/react-checkbox';
import { useAugmentedRef, useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import * as Slot from '@rn-primitives/slot';
import type { PressableRef } from '@rn-primitives/types';
import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import type { CheckboxIndicatorProps, CheckboxRootProps } from './types';

const CheckboxContext = React.createContext<CheckboxRootProps | null>(null);

const Root = React.forwardRef<PressableRef, CheckboxRootProps>(
  (
    { asChild, disabled, checked, onCheckedChange, onPress: onPressProp, role: _role, ...props },
    ref
  ) => {
    const augmentedRef = useAugmentedRef({ ref });

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onCheckedChange(!checked);
    }

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.dataset.state = checked ? 'checked' : 'unchecked';
        augRef.value = checked ? 'on' : 'off';
      }
    }, [checked]);

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.type = 'button';
        augRef.role = 'checkbox';

        if (disabled) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [disabled]);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <CheckboxContext.Provider value={{ checked, disabled, onCheckedChange }}>
        <Checkbox.Root
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          asChild
        >
          <Component
            ref={augmentedRef}
            role='button'
            onPress={onPress}
            disabled={disabled}
            {...props}
          />
        </Checkbox.Root>
      </CheckboxContext.Provider>
    );
  }
);

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

const Indicator = React.forwardRef<React.ElementRef<typeof View>, CheckboxIndicatorProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { checked, disabled } = useCheckboxContext();
    const augmentedRef = useAugmentedRef({ ref });

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.state = checked ? 'checked' : 'unchecked';
      }
    }, [checked]);

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        if (disabled) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [disabled]);

    const Component = asChild ? Slot.View : View;
    return (
      <Checkbox.Indicator forceMount={forceMount} asChild>
        <Component ref={ref} {...props} />
      </Checkbox.Indicator>
    );
  }
);

Indicator.displayName = 'IndicatorWebCheckbox';

export { Indicator, Root };
