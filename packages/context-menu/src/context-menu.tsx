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
  type AccessibilityActionEvent,
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

interface IRootContext extends RootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pressPosition: LayoutPosition | null;
  setPressPosition: (pressPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
}

const RootContext = React.createContext<IRootContext | null>(null);

const Root = React.forwardRef<RootRef, RootProps>(
  ({ asChild, relativeTo = 'longPress', onOpenChange: onOpenChangeProp, ...viewProps }, ref) => {
    const nativeID = React.useId();
    const [pressPosition, setPressPosition] = React.useState<LayoutPosition | null>(null);
    const [contentLayout, setContentLayout] = React.useState<LayoutRectangle | null>(null);
    const [open, setOpen] = React.useState(false);

    function onOpenChange(value: boolean) {
      setOpen(value);
      onOpenChangeProp?.(value);
    }

    const Component = asChild ? Slot : View;
    return (
      <RootContext.Provider
        value={{
          open,
          onOpenChange,
          relativeTo,
          contentLayout,
          nativeID,
          pressPosition,
          setContentLayout,
          setPressPosition,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    );
  }
);

Root.displayName = 'RootNativeContextMenu';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}

const accessibilityActions = [{ name: 'longpress' }];

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(
  (
    {
      asChild,
      onLongPress: onLongPressProp,
      disabled = false,
      onAccessibilityAction: onAccessibilityActionProp,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange, relativeTo, setPressPosition } = useRootContext();
    const augmentedRef = useAugmentedRef({
      ref,
      methods: {
        open: () => {
          onOpenChange(true);
          augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
            setPressPosition({ width, pageX, pageY: pageY, height });
          });
        },
        close: () => {
          setPressPosition(null);
          onOpenChange(false);
        },
      },
    });

    function onLongPress(ev: GestureResponderEvent) {
      if (disabled) return;
      if (relativeTo === 'longPress') {
        setPressPosition({
          width: 0,
          pageX: ev.nativeEvent.pageX,
          pageY: ev.nativeEvent.pageY,
          height: 0,
        });
      }
      if (relativeTo === 'trigger') {
        augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
          setPressPosition({ width, pageX, pageY: pageY, height });
        });
      }
      onOpenChange(!open);
      onLongPressProp?.(ev);
    }

    function onAccessibilityAction(event: AccessibilityActionEvent) {
      if (disabled) return;
      if (event.nativeEvent.actionName === 'longpress') {
        setPressPosition({
          width: 0,
          pageX: 0,
          pageY: 0,
          height: 0,
        });
        const newValue = !open;
        onOpenChange(newValue);
      }
      onAccessibilityActionProp?.(event);
    }

    const Component = asChild ? Slot : Pressable;
    return (
      <Component
        ref={augmentedRef}
        aria-disabled={disabled ?? undefined}
        role='button'
        onLongPress={onLongPress}
        disabled={disabled ?? undefined}
        aria-expanded={open}
        accessibilityActions={accessibilityActions}
        onAccessibilityAction={onAccessibilityAction}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'TriggerNativeContextMenu';

/**
 * @warning when using a custom `<PortalHost />`, you will have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: PortalProps) {
  const value = useRootContext();

  if (!value.pressPosition) {
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

const Overlay = React.forwardRef<OverlayRef, OverlayProps>(
  ({ asChild, forceMount, onPress: OnPressProp, closeOnPress = true, ...props }, ref) => {
    const { open, onOpenChange, setContentLayout, setPressPosition } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setPressPosition(null);
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
  }
);

Overlay.displayName = 'OverlayNativeContextMenu';

const Content = React.forwardRef<ContentRef, ContentProps>(
  (
    {
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
    },
    ref
  ) => {
    const {
      open,
      onOpenChange,
      contentLayout,
      nativeID,
      pressPosition,
      setContentLayout,
      setPressPosition,
    } = useRootContext();

    React.useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        setPressPosition(null);
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
      triggerPosition: pressPosition,
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
  }
);

Content.displayName = 'ContentNativeContextMenu';

const Item = React.forwardRef<ItemRef, ItemProps>(
  (
    { asChild, textValue, onPress: onPressProp, disabled = false, closeOnPress = true, ...props },
    ref
  ) => {
    const { onOpenChange, setContentLayout, setPressPosition } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setPressPosition(null);
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
  }
);

Item.displayName = 'ItemNativeContextMenu';

const Group = React.forwardRef<GroupRef, GroupProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='group' {...props} />;
});

Group.displayName = 'GroupNativeContextMenu';

const Label = React.forwardRef<LabelRef, LabelProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot : Text;
  return <Component ref={ref} {...props} />;
});

Label.displayName = 'LabelNativeContextMenu';

type FormItemContext =
  | { checked: boolean }
  | {
      value: string | undefined;
      onValueChange: (value: string) => void;
    };

const FormItemContext = React.createContext<FormItemContext | null>(null);

const CheckboxItem = React.forwardRef<CheckboxItemRef, CheckboxItemProps>(
  (
    {
      asChild,
      checked,
      onCheckedChange,
      textValue,
      onPress: onPressProp,
      closeOnPress = true,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { onOpenChange, setContentLayout, setPressPosition, nativeID } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      onCheckedChange(!checked);
      if (closeOnPress) {
        setPressPosition(null);
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
  }
);

CheckboxItem.displayName = 'CheckboxItemNativeContextMenu';

function useFormItemContext() {
  const context = React.useContext(FormItemContext);
  if (!context) {
    throw new Error(
      'CheckboxItem or RadioItem compound components cannot be rendered outside of a CheckboxItem or RadioItem component'
    );
  }
  return context;
}

const RadioGroup = React.forwardRef<RadioGroupRef, RadioGroupProps>(
  ({ asChild, value, onValueChange, ...props }, ref) => {
    const Component = asChild ? Slot : View;
    return (
      <FormItemContext.Provider value={{ value, onValueChange }}>
        <Component ref={ref} role='radiogroup' {...props} />
      </FormItemContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroupNativeContextMenu';

type BothFormItemContext = Exclude<FormItemContext, { checked: boolean }> & {
  checked: boolean;
};

const RadioItemContext = React.createContext({} as { itemValue: string });

const RadioItem = React.forwardRef<RadioItemRef, RadioItemProps>(
  (
    {
      asChild,
      value: itemValue,
      textValue,
      onPress: onPressProp,
      disabled = false,
      closeOnPress = true,
      ...props
    },
    ref
  ) => {
    const { onOpenChange, setContentLayout, setPressPosition } = useRootContext();

    const { value, onValueChange } = useFormItemContext() as BothFormItemContext;
    function onPress(ev: GestureResponderEvent) {
      onValueChange(itemValue);
      if (closeOnPress) {
        setPressPosition(null);
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
  }
);

RadioItem.displayName = 'RadioItemNativeContextMenu';

function useItemIndicatorContext() {
  return React.useContext(RadioItemContext);
}

const ItemIndicator = React.forwardRef<ItemIndicatorRef, ItemIndicatorProps>(
  ({ asChild, forceMount, ...props }, ref) => {
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
  }
);

ItemIndicator.displayName = 'ItemIndicatorNativeContextMenu';

const Separator = React.forwardRef<SeparatorRef, SeparatorProps>(
  ({ asChild, decorative, ...props }, ref) => {
    const Component = asChild ? Slot : View;
    return <Component role={decorative ? 'presentation' : 'separator'} ref={ref} {...props} />;
  }
);

Separator.displayName = 'SeparatorNativeContextMenu';

const SubContext = React.createContext<{
  nativeID: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
} | null>(null);

const Sub = React.forwardRef<SubRef, SubProps>(
  ({ asChild, defaultOpen, open: openProp, onOpenChange: onOpenChangeProp, ...props }, ref) => {
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
  }
);

Sub.displayName = 'SubNativeContextMenu';

function useSubContext() {
  const context = React.useContext(SubContext);
  if (!context) {
    throw new Error('Sub compound components cannot be rendered outside of a Sub component');
  }
  return context;
}

const SubTrigger = React.forwardRef<SubTriggerRef, SubTriggerProps>(
  ({ asChild, textValue, onPress: onPressProp, disabled = false, ...props }, ref) => {
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
  }
);

SubTrigger.displayName = 'SubTriggerNativeContextMenu';

const SubContent = React.forwardRef<SubContentRef, SubContentProps>(
  ({ asChild = false, forceMount, ...props }, ref) => {
    const { open, nativeID } = useSubContext();

    if (!forceMount) {
      if (!open) {
        return null;
      }
    }

    const Component = asChild ? Slot : Pressable;
    return <Component ref={ref} role='group' accessibilityLabelledBy={nativeID} {...props} />;
  }
);

Content.displayName = 'ContentNativeContextMenu';

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

function onStartShouldSetResponder() {
  return true;
}
