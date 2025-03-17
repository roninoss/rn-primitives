import {
  useAugmentedRef,
  useControllableState,
  useRelativePosition,
  type LayoutPosition,
} from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import {
  BackHandler,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import type {
  CheckboxItemProps,
  CheckboxItemRef,
  ContentProps,
  ContentRef,
  GroupProps,
  GroupRef,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemProps,
  ItemRef,
  LabelProps,
  LabelRef,
  MenuProps,
  MenuRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RadioGroupProps,
  RadioGroupRef,
  RadioItemProps,
  RadioItemRef,
  RootProps,
  RootRef,
  SeparatorProps,
  SeparatorRef,
  SubContentProps,
  SubContentRef,
  SubProps,
  SubRef,
  SubTriggerProps,
  SubTriggerRef,
  TriggerProps,
  TriggerRef,
} from './types';

interface IMenuContext extends RootProps {
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
}

const RootContext = React.createContext<IMenuContext | null>(null);

const Root = (
  {
    ref,
    asChild,
    value,
    onValueChange,
    ...viewProps
  }: RootProps & {
    ref: React.RefObject<RootRef>;
  }
) => {
  const nativeID = React.useId();
  const [triggerPosition, setTriggerPosition] = React.useState<LayoutPosition | null>(null);
  const [contentLayout, setContentLayout] = React.useState<LayoutRectangle | null>(null);

  const Component = asChild ? Slot : View;
  return (
    <RootContext.Provider
      value={{
        value,
        onValueChange,
        nativeID,
        contentLayout,
        setContentLayout,
        setTriggerPosition,
        triggerPosition,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </RootContext.Provider>
  );
};

Root.displayName = 'RootMenubar';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Menubar compound components cannot be rendered outside the Menubar component');
  }
  return context;
}

const MenuContext = React.createContext<MenuProps | null>(null);

const Menu = (
  {
    ref,
    asChild,
    value,
    ...viewProps
  }: MenuProps & {
    ref: React.RefObject<MenuRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return (
    <MenuContext.Provider
      value={{
        value,
      }}
    >
      <Component ref={ref} role='menubar' {...viewProps} />
    </MenuContext.Provider>
  );
};

Menu.displayName = 'MenuMenubar';

function useMenuContext() {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error('Menubar compound components cannot be rendered outside the Menubar component');
  }
  return context;
}

const Trigger = (
  {
    ref,
    asChild,
    onPress: onPressProp,
    disabled = false,
    ...props
  }: TriggerProps & {
    ref: React.RefObject<TriggerRef>;
  }
) => {
  const triggerRef = useAugmentedRef({ ref });
  const { value, onValueChange, setTriggerPosition } = useRootContext();
  const { value: menuValue } = useMenuContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerPosition({ width, pageX, pageY, height });
    });

    onValueChange(menuValue === value ? undefined : menuValue);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      ref={triggerRef}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      aria-expanded={value === menuValue}
      {...props}
    />
  );
};

Trigger.displayName = 'TriggerMenubar';

/**
 * @warning when using a custom `<PortalHost />`, you will have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: PortalProps) {
  const menubar = useRootContext();
  const menu = useMenuContext();

  if (!menubar.triggerPosition) {
    return null;
  }

  if (!forceMount) {
    if (menubar.value !== menu.value) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${menubar.nativeID}_portal`}>
      <RootContext.Provider value={menubar} key={`RootContext_${menubar.nativeID}_portal_provider`}>
        <MenuContext.Provider value={menu} key={`MenuContext_${menubar.nativeID}_portal_provider`}>
          {children}
        </MenuContext.Provider>
      </RootContext.Provider>
    </RNPPortal>
  );
}

const Overlay = (
  {
    ref,
    asChild,
    forceMount,
    onPress: OnPressProp,
    closeOnPress = true,
    ...props
  }: OverlayProps & {
    ref: React.RefObject<OverlayRef>;
  }
) => {
  const { value, onValueChange, setContentLayout, setTriggerPosition } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (closeOnPress) {
      setTriggerPosition(null);
      setContentLayout(null);
      onValueChange(undefined);
    }
    OnPressProp?.(ev);
  }

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} onPress={onPress} {...props} />;
};

Overlay.displayName = 'OverlayMenubar';

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior by setting `disablePositioningStyle` to `true`.
 */
const Content = (
  {
    ref,
    asChild = false,
    forceMount,
    align = 'start',
    side = 'bottom',
    sideOffset = 0,
    alignOffset = 0,
    avoidCollisions = true,
    onLayout: onLayoutProp,
    insets,
    style,
    disablePositioningStyle,
    ...props
  }: ContentProps & {
    ref: React.RefObject<ContentRef>;
  }
) => {
  const {
    value,
    onValueChange,
    triggerPosition,
    contentLayout,
    setContentLayout,
    nativeID,
    setTriggerPosition,
  } = useRootContext();
  const { value: menuValue } = useMenuContext();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setTriggerPosition(null);
      setContentLayout(null);
      onValueChange(undefined);
      return true;
    });

    return () => {
      setContentLayout(null);
      backHandler.remove();
    };
  }, []);

  const positionStyle = useRelativePosition({
    align,
    avoidCollisions,
    triggerPosition,
    contentLayout,
    alignOffset,
    insets,
    sideOffset,
    side,
    disablePositioningStyle,
  });

  function onLayout(event: LayoutChangeEvent) {
    setContentLayout(event.nativeEvent.layout);
    onLayoutProp?.(event);
  }

  if (!forceMount) {
    if (value !== menuValue) {
      return null;
    }
  }

  const Component = asChild ? Slot : View;
  return (
    <Component
      ref={ref}
      role='menu'
      nativeID={nativeID}
      aria-modal={true}
      style={[positionStyle, style]}
      onLayout={onLayout}
      onStartShouldSetResponder={onStartShouldSetResponder}
      {...props}
    />
  );
};

Content.displayName = 'ContentMenubar';

const Item = (
  {
    ref,
    asChild,
    textValue,
    onPress: onPressProp,
    disabled = false,
    closeOnPress = true,
    ...props
  }: ItemProps & {
    ref: React.RefObject<ItemRef>;
  }
) => {
  const { onValueChange, setContentLayout, setTriggerPosition } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (closeOnPress) {
      setTriggerPosition(null);
      setContentLayout(null);
      onValueChange(undefined);
    }
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      ref={ref}
      role='menuitem'
      onPress={onPress}
      disabled={disabled}
      aria-valuetext={textValue}
      aria-disabled={!!disabled}
      accessibilityState={{ disabled: !!disabled }}
      {...props}
    />
  );
};

Item.displayName = 'ItemMenubar';

const Group = (
  {
    ref,
    asChild,
    ...props
  }: GroupProps & {
    ref: React.RefObject<GroupRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='group' {...props} />;
};

Group.displayName = 'GroupMenubar';

const Label = (
  {
    ref,
    asChild,
    ...props
  }: LabelProps & {
    ref: React.RefObject<LabelRef>;
  }
) => {
  const Component = asChild ? Slot : Text;
  return <Component ref={ref} {...props} />;
};

Label.displayName = 'LabelMenubar';

type FormItemContext =
  | { checked: boolean }
  | {
      value: string | undefined;
      onValueChange: (value: string) => void;
    };

const FormItemContext = React.createContext<FormItemContext | null>(null);

const CheckboxItem = (
  {
    ref,
    asChild,
    checked,
    onCheckedChange,
    textValue,
    onPress: onPressProp,
    closeOnPress = true,
    disabled = false,
    ...props
  }: CheckboxItemProps & {
    ref: React.RefObject<CheckboxItemRef>;
  }
) => {
  const { onValueChange, setTriggerPosition, setContentLayout, nativeID } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    onCheckedChange(!checked);
    if (closeOnPress) {
      setTriggerPosition(null);
      setContentLayout(null);
      onValueChange(undefined);
    }
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <FormItemContext.Provider value={{ checked }}>
      <Component
        ref={ref}
        role='checkbox'
        aria-checked={checked}
        onPress={onPress}
        disabled={disabled}
        aria-disabled={!!disabled}
        aria-valuetext={textValue}
        accessibilityState={{ disabled: !!disabled }}
        {...props}
      />
    </FormItemContext.Provider>
  );
};

CheckboxItem.displayName = 'CheckboxItemMenubar';

function useFormItemContext() {
  const context = React.useContext(FormItemContext);
  if (!context) {
    throw new Error(
      'CheckboxItem or RadioItem compound components cannot be rendered outside of a CheckboxItem or RadioItem component'
    );
  }
  return context;
}

const RadioGroup = (
  {
    ref,
    asChild,
    value,
    onValueChange,
    ...props
  }: RadioGroupProps & {
    ref: React.RefObject<RadioGroupRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return (
    <FormItemContext.Provider value={{ value, onValueChange }}>
      <Component ref={ref} role='radiogroup' {...props} />
    </FormItemContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroupMenubar';

type BothFormItemContext = Exclude<FormItemContext, { checked: boolean }> & {
  checked: boolean;
};

const RadioItemContext = React.createContext({} as { itemValue: string });

const RadioItem = (
  {
    ref,
    asChild,
    value: itemValue,
    textValue,
    onPress: onPressProp,
    disabled = false,
    closeOnPress = true,
    ...props
  }: RadioItemProps & {
    ref: React.RefObject<RadioItemRef>;
  }
) => {
  const {
    onValueChange: onRootValueChange,
    setTriggerPosition,
    setContentLayout,
  } = useRootContext();

  const { value, onValueChange } = useFormItemContext() as BothFormItemContext;
  function onPress(ev: GestureResponderEvent) {
    onValueChange(itemValue);
    if (closeOnPress) {
      setTriggerPosition(null);
      setContentLayout(null);
      onRootValueChange(undefined);
    }
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <RadioItemContext.Provider value={{ itemValue }}>
      <Component
        ref={ref}
        onPress={onPress}
        role='radio'
        aria-checked={value === itemValue}
        disabled={disabled ?? false}
        accessibilityState={{
          disabled: disabled ?? false,
          checked: value === itemValue,
        }}
        aria-valuetext={textValue}
        {...props}
      />
    </RadioItemContext.Provider>
  );
};

RadioItem.displayName = 'RadioItemMenubar';

function useItemIndicatorContext() {
  return React.useContext(RadioItemContext);
}

const ItemIndicator = (
  {
    ref,
    asChild,
    forceMount,
    ...props
  }: ItemIndicatorProps & {
    ref: React.RefObject<ItemIndicatorRef>;
  }
) => {
  const { itemValue } = useItemIndicatorContext();
  const { checked, value } = useFormItemContext() as BothFormItemContext;

  if (!forceMount) {
    if (itemValue == null && !checked) {
      return null;
    }
    if (value !== itemValue) {
      return null;
    }
  }
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='presentation' {...props} />;
};

ItemIndicator.displayName = 'ItemIndicatorMenubar';

const Separator = (
  {
    ref,
    asChild,
    decorative,
    ...props
  }: SeparatorProps & {
    ref: React.RefObject<SeparatorRef>;
  }
) => {
  const Component = asChild ? Slot : View;
  return <Component role={decorative ? 'presentation' : 'separator'} ref={ref} {...props} />;
};

Separator.displayName = 'SeparatorMenubar';

const SubContext = React.createContext<{
  nativeID: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
} | null>(null);

const Sub = (
  {
    ref,
    asChild,
    defaultOpen,
    open: openProp,
    onOpenChange: onOpenChangeProp,
    ...props
  }: SubProps & {
    ref: React.RefObject<SubRef>;
  }
) => {
  const nativeID = React.useId();
  const [open = false, onOpenChange] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChangeProp,
  });

  const Component = asChild ? Slot : View;
  return (
    <SubContext.Provider
      value={{
        nativeID,
        open,
        onOpenChange,
      }}
    >
      <Component ref={ref} {...props} />
    </SubContext.Provider>
  );
};

Sub.displayName = 'SubMenubar';

function useSubContext() {
  const context = React.useContext(SubContext);
  if (!context) {
    throw new Error('Sub compound components cannot be rendered outside of a Sub component');
  }
  return context;
}

const SubTrigger = (
  {
    ref,
    asChild,
    textValue,
    onPress: onPressProp,
    disabled = false,
    ...props
  }: SubTriggerProps & {
    ref: React.RefObject<SubTriggerRef>;
  }
) => {
  const { nativeID, open, onOpenChange } = useSubContext();

  function onPress(ev: GestureResponderEvent) {
    onOpenChange(!open);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      ref={ref}
      aria-valuetext={textValue}
      role='menuitem'
      aria-expanded={open}
      accessibilityState={{ expanded: open, disabled: !!disabled }}
      nativeID={nativeID}
      onPress={onPress}
      disabled={disabled}
      aria-disabled={!!disabled}
      {...props}
    />
  );
};

SubTrigger.displayName = 'SubTriggerMenubar';

const SubContent = (
  {
    ref,
    asChild = false,
    forceMount,
    ...props
  }: SubContentProps & {
    ref: React.RefObject<SubContentRef>;
  }
) => {
  const { open, nativeID } = useSubContext();

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='group' aria-labelledby={nativeID} {...props} />;
};

SubContent.displayName = 'SubContentMenubar';

export {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Menu,
  Overlay,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
  useMenuContext,
  useRootContext,
  useSubContext,
};

function onStartShouldSetResponder() {
  return true;
}
