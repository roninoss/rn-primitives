import * as Toolbar from '@radix-ui/react-toolbar';
import * as Slot from '@rn-primitives/slot';
import { ToggleGroupUtils } from '@rn-primitives/utils';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type {
  ButtonProps,
  ButtonRef,
  LinkProps,
  LinkRef,
  RootProps,
  RootRef,
  SeparatorProps,
  SeparatorRef,
  ToggleGroupProps,
  ToggleGroupRef,
  ToggleItemProps,
  ToggleItemRef,
} from './types';

function Root({ ref, asChild, orientation, dir, loop, style, ...props }: RootProps & { ref?: React.Ref<RootRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <Toolbar.Root orientation={orientation} dir={dir} loop={loop} asChild>
        <Component ref={ref} {...props} />
      </Toolbar.Root>
    );
  }

Root.displayName = 'RootWebToolbar';

const ToggleGroupContext = React.createContext<ToggleGroupProps | null>(null);

function ToggleGroup({ ref, asChild, type, value, onValueChange, disabled = false, style, ...viewProps }: ToggleGroupProps & { ref?: React.Ref<ToggleGroupRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <ToggleGroupContext.Provider
        value={
          {
            type,
            value,
            disabled,
            onValueChange,
          } as ToggleGroupProps
        }
      >
        <Toolbar.ToggleGroup
          type={type as any}
          value={value as any}
          onValueChange={onValueChange as any}
          disabled={disabled}
          asChild
        >
          <Component ref={ref} {...viewProps} />
        </Toolbar.ToggleGroup>
      </ToggleGroupContext.Provider>
    );
  }

ToggleGroup.displayName = 'ToggleGroupWebToolbar';

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

function ToggleItem({ ref, asChild,
      value: itemValue,
      disabled: disabledProp = false,
      onPress: onPressProp,
      style,
      ...props }: ToggleItemProps & { ref?: React.Ref<ToggleItemRef> }) {
    const { type, disabled, value, onValueChange } = useToggleGroupContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled || disabledProp) return;
      if (type === 'single') {
        onValueChange(ToggleGroupUtils.getNewSingleValue(value, itemValue));
      }
      if (type === 'multiple') {
        onValueChange(ToggleGroupUtils.getNewMultipleValue(value, itemValue));
      }
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Toolbar.ToggleItem value={itemValue} asChild>
        <Component ref={ref} onPress={onPress} role='button' {...props} />
      </Toolbar.ToggleItem>
    );
  }

ToggleItem.displayName = 'ToggleItemWebToolbar';

function Separator({ ref, asChild, style, ...props }: SeparatorProps & { ref?: React.Ref<SeparatorRef> }) {
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} {...props} />;
  }

Separator.displayName = 'SeparatorWebToolbar';

function Link({ ref, asChild, style, ...props }: LinkProps & { ref?: React.Ref<LinkRef> }) {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Toolbar.Link asChild>
      <Component ref={ref} {...props} />
    </Toolbar.Link>
  );
}

Link.displayName = 'LinkWebToolbar';

function Button({ ref, asChild, style, ...props }: ButtonProps & { ref?: React.Ref<ButtonRef> }) {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Toolbar.Button asChild>
      <Component ref={ref} role='button' {...props} />
    </Toolbar.Button>
  );
}

Button.displayName = 'ButtonWebToolbar';

export { Button, Link, Root, Separator, ToggleGroup, ToggleItem };
