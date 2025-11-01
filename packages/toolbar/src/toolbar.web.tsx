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

const Root = React.forwardRef<RootRef, RootProps>(
  ({ asChild, orientation, dir, loop, style, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Toolbar.Root orientation={orientation} dir={dir} loop={loop} asChild>
        <Component ref={ref} style={style} {...props} />
      </Toolbar.Root>
    );
  }
);

Root.displayName = 'RootWebToolbar';

const ToggleGroupContext = React.createContext<ToggleGroupProps | null>(null);

const ToggleGroup = React.forwardRef<ToggleGroupRef, ToggleGroupProps>(
  ({ asChild, type, value, onValueChange, disabled = false, style, ...viewProps }, ref) => {
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
          <Component ref={ref} style={style} {...viewProps} />
        </Toolbar.ToggleGroup>
      </ToggleGroupContext.Provider>
    );
  }
);

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

const ToggleItem = React.forwardRef<ToggleItemRef, ToggleItemProps>(
  (
    {
      asChild,
      value: itemValue,
      disabled: disabledProp = false,
      onPress: onPressProp,
      style,
      ...props
    },
    ref
  ) => {
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
        <Component ref={ref} onPress={onPress} role='button' style={style} {...props} />
      </Toolbar.ToggleItem>
    );
  }
);

ToggleItem.displayName = 'ToggleItemWebToolbar';

const Separator = React.forwardRef<SeparatorRef, SeparatorProps>(
  ({ asChild, style, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} style={style} {...props} />;
  }
);

Separator.displayName = 'SeparatorWebToolbar';

const Link = React.forwardRef<LinkRef, LinkProps>(({ asChild, style, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Toolbar.Link asChild>
      <Component ref={ref} style={style} {...props} />
    </Toolbar.Link>
  );
});

Link.displayName = 'LinkWebToolbar';

const Button = React.forwardRef<ButtonRef, ButtonProps>(({ asChild, style, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Toolbar.Button asChild>
      <Component ref={ref} role='button' style={style} {...props} />
    </Toolbar.Button>
  );
});

export { Button, Link, Root, Separator, ToggleGroup, ToggleItem };
