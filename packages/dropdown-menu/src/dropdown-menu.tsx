import {
  useComposedRefs,
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

interface IRootContext {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
}

const RootContext = React.createContext<IRootContext | null>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  onOpenChange: onOpenChangeProp,
  ref,
  ...viewProps
}: RootComponentProps) => {
  const nativeID = React.useId();
  const [triggerPosition, setTriggerPosition] = React.useState<LayoutPosition | null>(null);
  const [contentLayout, setContentLayout] = React.useState<LayoutRectangle | null>(null);
  const [open, setOpen] = React.useState(false);

  function onOpenChange(open: boolean) {
    setOpen(open);
    onOpenChangeProp?.(open);
  }

  const Component = asChild ? Slot : View;
  return (
    <RootContext.Provider
      value={{
        open,
        onOpenChange,
        contentLayout,
        setContentLayout,
        nativeID,
        setTriggerPosition,
        triggerPosition,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </RootContext.Provider>
  );
};

Root.displayName = 'RootNativeDropdownMenu';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'DropdownMenu compound components cannot be rendered outside the DropdownMenu component'
    );
  }
  return context;
}
type TriggerComponentProps = TriggerProps & React.RefAttributes<TriggerRef>;

const Trigger = ({
  asChild,
  onPress: onPressProp,
  disabled = false,
  ref,
  ...props
}: TriggerComponentProps) => {
  const { open, onOpenChange, setTriggerPosition } = useRootContext();
  const triggerRef = React.useRef<TriggerRef>(null);
  const composedRef = useComposedRefs(triggerRef);

  function measureTrigger() {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerPosition({ width, pageX, pageY: pageY, height });
    });
  }

  function openTrigger() {
    onOpenChange(true);
    measureTrigger();
  }

  function closeTrigger() {
    setTriggerPosition(null);
    onOpenChange(false);
  }

  React.useImperativeHandle(
    ref,
    () =>
      ({
        ...(triggerRef.current ?? {}),
        open: openTrigger,
        close: closeTrigger,
      } as TriggerRef),
    [onOpenChange, setTriggerPosition]
  );

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    measureTrigger();
    const newValue = !open;
    onOpenChange(newValue);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      ref={composedRef}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      aria-expanded={open}
      {...props}
    />
  );
};

Trigger.displayName = 'TriggerNativeDropdownMenu';

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: PortalProps) {
  const value = useRootContext();

  if (!value.triggerPosition) {
    return null;
  }

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
      <RootContext.Provider value={value}>{children}</RootContext.Provider>
    </RNPPortal>
  );
}
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({
  asChild,
  forceMount,
  onPress: OnPressProp,
  closeOnPress = true,
  ref,
  ...props
}: OverlayComponentProps) => {
  const { open, onOpenChange, setContentLayout, setTriggerPosition } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (closeOnPress) {
      setTriggerPosition(null);
      setContentLayout(null);
      onOpenChange(false);
    }
    OnPressProp?.(ev);
  }

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} onPress={onPress} {...props} />;
};

Overlay.displayName = 'OverlayNativeDropdownMenu';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({
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
  ref,
  ...props
}: ContentComponentProps) => {
  const {
    open,
    onOpenChange,
    nativeID,
    triggerPosition,
    setTriggerPosition,
    contentLayout,
    setContentLayout,
  } = useRootContext();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setTriggerPosition(null);
      setContentLayout(null);
      onOpenChange(false);
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
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      ref={ref}
      role='menu'
      nativeID={nativeID}
      aria-modal={true}
      style={[positionStyle, style]}
      onLayout={onLayout}
      {...props}
    />
  );
};

Content.displayName = 'ContentNativeDropdownMenu';
type ItemComponentProps = ItemProps & React.RefAttributes<ItemRef>;

const Item = ({
  asChild,
  textValue,
  onPress: onPressProp,
  disabled = false,
  closeOnPress = true,
  ref,
  ...props
}: ItemComponentProps) => {
  const { onOpenChange, setTriggerPosition, setContentLayout } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (closeOnPress) {
      setTriggerPosition(null);
      setContentLayout(null);
      onOpenChange(false);
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

Item.displayName = 'ItemNativeDropdownMenu';
type GroupComponentProps = GroupProps & React.RefAttributes<GroupRef>;

const Group = ({ asChild, ref, ...props }: GroupComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='group' {...props} />;
};

Group.displayName = 'GroupNativeDropdownMenu';
type LabelComponentProps = LabelProps & React.RefAttributes<LabelRef>;

const Label = ({ asChild, ref, ...props }: LabelComponentProps) => {
  const Component = asChild ? Slot : Text;
  return <Component ref={ref} {...props} />;
};

Label.displayName = 'LabelNativeDropdownMenu';

type FormItemContext =
  | { checked: boolean }
  | {
      value: string | undefined;
      onValueChange: (value: string) => void;
    };

const FormItemContext = React.createContext<FormItemContext | null>(null);
type CheckboxItemComponentProps = CheckboxItemProps & React.RefAttributes<CheckboxItemRef>;

const CheckboxItem = ({
  asChild,
  checked,
  onCheckedChange,
  textValue,
  onPress: onPressProp,
  closeOnPress = true,
  disabled = false,
  ref,
  ...props
}: CheckboxItemComponentProps) => {
  const { onOpenChange, setContentLayout, setTriggerPosition, nativeID } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    onCheckedChange(!checked);
    if (closeOnPress) {
      setTriggerPosition(null);
      setContentLayout(null);
      onOpenChange(false);
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

CheckboxItem.displayName = 'CheckboxItemNativeDropdownMenu';

function useFormItemContext() {
  const context = React.useContext(FormItemContext);
  if (!context) {
    throw new Error(
      'CheckboxItem or RadioItem compound components cannot be rendered outside of a CheckboxItem or RadioItem component'
    );
  }
  return context;
}
type RadioGroupComponentProps = RadioGroupProps & React.RefAttributes<RadioGroupRef>;

const RadioGroup = ({ asChild, value, onValueChange, ref, ...props }: RadioGroupComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <FormItemContext.Provider value={{ value, onValueChange }}>
      <Component ref={ref} role='radiogroup' {...props} />
    </FormItemContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroupNativeDropdownMenu';

type BothFormItemContext = Exclude<FormItemContext, { checked: boolean }> & {
  checked: boolean;
};

const RadioItemContext = React.createContext({} as { itemValue: string });
type RadioItemComponentProps = RadioItemProps & React.RefAttributes<RadioItemRef>;

const RadioItem = ({
  asChild,
  value: itemValue,
  textValue,
  onPress: onPressProp,
  disabled = false,
  closeOnPress = true,
  ref,
  ...props
}: RadioItemComponentProps) => {
  const { onOpenChange, setContentLayout, setTriggerPosition } = useRootContext();

  const { value, onValueChange } = useFormItemContext() as BothFormItemContext;
  function onPress(ev: GestureResponderEvent) {
    onValueChange(itemValue);
    if (closeOnPress) {
      setTriggerPosition(null);
      setContentLayout(null);
      onOpenChange(false);
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

RadioItem.displayName = 'RadioItemNativeDropdownMenu';

function useItemIndicatorContext() {
  return React.useContext(RadioItemContext);
}
type ItemIndicatorComponentProps = ItemIndicatorProps & React.RefAttributes<ItemIndicatorRef>;

const ItemIndicator = ({ asChild, forceMount, ref, ...props }: ItemIndicatorComponentProps) => {
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

ItemIndicator.displayName = 'ItemIndicatorNativeDropdownMenu';
type SeparatorComponentProps = SeparatorProps & React.RefAttributes<SeparatorRef>;

const Separator = ({ asChild, decorative, ref, ...props }: SeparatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component role={decorative ? 'presentation' : 'separator'} ref={ref} {...props} />;
};

Separator.displayName = 'SeparatorNativeDropdownMenu';

const SubContext = React.createContext<{
  nativeID: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
} | null>(null);
type SubComponentProps = SubProps & React.RefAttributes<SubRef>;

const Sub = ({
  asChild,
  defaultOpen,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  ref,
  ...props
}: SubComponentProps) => {
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

Sub.displayName = 'SubNativeDropdownMenu';

function useSubContext() {
  const context = React.useContext(SubContext);
  if (!context) {
    throw new Error('Sub compound components cannot be rendered outside of a Sub component');
  }
  return context;
}
type SubTriggerComponentProps = SubTriggerProps & React.RefAttributes<SubTriggerRef>;

const SubTrigger = ({
  asChild,
  textValue,
  onPress: onPressProp,
  disabled = false,
  ref,
  ...props
}: SubTriggerComponentProps) => {
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

SubTrigger.displayName = 'SubTriggerNativeDropdownMenu';
type SubContentComponentProps = SubContentProps & React.RefAttributes<SubContentRef>;

const SubContent = ({ asChild = false, forceMount, ref, ...props }: SubContentComponentProps) => {
  const { open, nativeID } = useSubContext();

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} role='group' aria-labelledby={nativeID} {...props} />;
};

Content.displayName = 'ContentNativeDropdownMenu';

export {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
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
  useRootContext,
  useSubContext,
};
