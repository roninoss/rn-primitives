import * as Toolbar from '@radix-ui/react-toolbar';
import { Slot } from '@rn-primitives/slot';
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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({ asChild, orientation, dir, loop, style, ref, ...props }: RootComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Toolbar.Root orientation={orientation} dir={dir} loop={loop} asChild>
      <Component ref={ref} {...props} />
    </Toolbar.Root>
  );
};

Root.displayName = 'RootWebToolbar';

const ToggleGroupContext = React.createContext<ToggleGroupProps | null>(null);
type ToggleGroupComponentProps = ToggleGroupProps & React.RefAttributes<ToggleGroupRef>;

const ToggleGroup = ({
  asChild,
  type,
  value,
  onValueChange,
  disabled = false,
  style,
  ref,
  ...viewProps
}: ToggleGroupComponentProps) => {
  const Component = asChild ? Slot : View;
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
};

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
type ToggleItemComponentProps = ToggleItemProps & React.RefAttributes<ToggleItemRef>;

const ToggleItem = ({
  asChild,
  value: itemValue,
  disabled: disabledProp = false,
  onPress: onPressProp,
  style,
  ref,
  ...props
}: ToggleItemComponentProps) => {
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

  const Component = asChild ? Slot : Pressable;
  return (
    <Toolbar.ToggleItem value={itemValue} asChild>
      <Component ref={ref} onPress={onPress} role='button' {...props} />
    </Toolbar.ToggleItem>
  );
};

ToggleItem.displayName = 'ToggleItemWebToolbar';
type SeparatorComponentProps = SeparatorProps & React.RefAttributes<SeparatorRef>;

const Separator = ({ asChild, style, ref, ...props }: SeparatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} {...props} />;
};

Separator.displayName = 'SeparatorWebToolbar';
type LinkComponentProps = LinkProps & React.RefAttributes<LinkRef>;

const Link = ({ asChild, style, ref, ...props }: LinkComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return (
    <Toolbar.Link asChild>
      <Component ref={ref} {...props} />
    </Toolbar.Link>
  );
};

Link.displayName = 'LinkWebToolbar';
type ButtonComponentProps = ButtonProps & React.RefAttributes<ButtonRef>;

const Button = ({ asChild, style, ref, ...props }: ButtonComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return (
    <Toolbar.Button asChild>
      <Component ref={ref} role='button' {...props} />
    </Toolbar.Button>
  );
};

export { Button, Link, Root, Separator, ToggleGroup, ToggleItem };
