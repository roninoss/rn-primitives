import {
  useAugmentedRef,
  useControllableState,
  useRelativePosition,
  type LayoutPosition,
} from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import * as Slot from '@rn-primitives/slot';
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
  ContentProps,
  ContentRef,
  GroupProps,
  GroupRef,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemProps,
  ItemRef,
  ItemTextProps,
  ItemTextRef,
  LabelProps,
  LabelRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
  ScrollDownButtonProps,
  ScrollUpButtonProps,
  SeparatorProps,
  SeparatorRef,
  SharedRootContext,
  TriggerProps,
  TriggerRef,
  ValueProps,
  ValueRef,
  ViewportProps,
} from './types';

interface IRootContext extends SharedRootContext {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
}

const RootContext = React.createContext<IRootContext | null>(null);

function Root({ ref, asChild,
      value: valueProp,
      defaultValue,
      onValueChange: onValueChangeProp,
      onOpenChange: onOpenChangeProp,
      disabled,
      ...viewProps
     }: RootProps & { ref?: React.Ref<RootRef> }) {
    const nativeID = React.useId();
    const [value, onValueChange] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChangeProp,
    });
    const [triggerPosition, setTriggerPosition] = React.useState<LayoutPosition | null>(null);
    const [contentLayout, setContentLayout] = React.useState<LayoutRectangle | null>(null);
    const [open, setOpen] = React.useState(false);

    function onOpenChange(value: boolean) {
      setOpen(value);
      onOpenChangeProp?.(value);
    }

    const Component = asChild ? Slot.View : View;
    return (
      <RootContext.Provider
        value={{
          value,
          onValueChange,
          open,
          onOpenChange,
          disabled,
          contentLayout,
          nativeID,
          setContentLayout,
          setTriggerPosition,
          triggerPosition,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    );
  }

Root.displayName = 'RootNativeSelect';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Select compound components cannot be rendered outside the Select component');
  }
  return context;
}

function Trigger({ ref, asChild, onPress: onPressProp, disabled = false, ...props  }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
    const { open, onOpenChange, disabled: disabledRoot, setTriggerPosition } = useRootContext();

    const augmentedRef = useAugmentedRef({
      ref,
      methods: {
        open: () => {
          onOpenChange(true);
          augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
            setTriggerPosition({ width, pageX, pageY: pageY, height });
          });
        },
        close: () => {
          setTriggerPosition(null);
          onOpenChange(false);
        },
      },
    });

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY: pageY, height });
      });
      onOpenChange(!open);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={augmentedRef}
        aria-disabled={disabled ?? undefined}
        role='combobox'
        onPress={onPress}
        disabled={disabled ?? disabledRoot}
        aria-expanded={open}
        {...props}
      />
    );
  }

Trigger.displayName = 'TriggerNativeSelect';

function Value({ ref, asChild, placeholder, ...props  }: ValueProps & { ref?: React.Ref<ValueRef> }) {
  const { value } = useRootContext();
  const Component = asChild ? Slot.Text : Text;
  return (
    <Component ref={ref} {...props}>
      {value?.label ?? placeholder}
    </Component>
  );
}

Value.displayName = 'ValueNativeSelect';

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset.
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

function Overlay({ ref, asChild, forceMount, onPress: OnPressProp, closeOnPress = true, ...props  }: OverlayProps & { ref?: React.Ref<OverlayRef> }) {
    const { open, onOpenChange, setTriggerPosition, setContentLayout } = useRootContext();

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

    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} onPress={onPress} {...props} />;
  }

Overlay.displayName = 'OverlayNativeSelect';

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior by setting `disablePositioningStyle` to `true`.
 */
function Content({ ref, asChild = false,
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
      position: _position,
      ...props
     }: ContentProps & { ref?: React.Ref<ContentRef> }) {
    const {
      open,
      onOpenChange,
      contentLayout,
      nativeID,
      triggerPosition,
      setContentLayout,
      setTriggerPosition,
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

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        role='list'
        nativeID={nativeID}
        aria-modal={true}
        style={[positionStyle, style]}
        onLayout={onLayout}
        onStartShouldSetResponder={onStartShouldSetResponder}
        {...props}
      />
    );
  }

Content.displayName = 'ContentNativeSelect';

const ItemContext = React.createContext<{
  itemValue: string;
  label: string;
} | null>(null);

function Item({ ref, asChild,
      value: itemValue,
      label,
      onPress: onPressProp,
      disabled = false,
      closeOnPress = true,
      ...props
     }: ItemProps & { ref?: React.Ref<ItemRef> }) {
    const { onOpenChange, value, onValueChange, setTriggerPosition, setContentLayout } =
      useRootContext();
    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onOpenChange(false);
      }

      onValueChange({ value: itemValue, label });
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ItemContext.Provider value={{ itemValue, label }}>
        <Component
          ref={ref}
          role='option'
          onPress={onPress}
          disabled={disabled}
          aria-checked={value?.value === itemValue}
          aria-valuetext={label}
          aria-disabled={!!disabled}
          accessibilityState={{
            disabled: !!disabled,
            checked: value?.value === itemValue,
          }}
          {...props}
        />
      </ItemContext.Provider>
    );
  }

Item.displayName = 'ItemNativeSelect';

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error('Item compound components cannot be rendered outside of an Item component');
  }
  return context;
}

function ItemText({ ref, asChild, ...props  }: ItemTextProps & { ref?: React.Ref<ItemTextRef> }) {
  const { label } = useItemContext();

  const Component = asChild ? Slot.Text : Text;
  return (
    <Component ref={ref} {...props}>
      {label}
    </Component>
  );
}

ItemText.displayName = 'ItemTextNativeSelect';

function ItemIndicator({ ref, asChild, forceMount, ...props  }: ItemIndicatorProps & { ref?: React.Ref<ItemIndicatorRef> }) {
    const { itemValue } = useItemContext();
    const { value } = useRootContext();

    if (!forceMount) {
      if (value?.value !== itemValue) {
        return null;
      }
    }
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} role='presentation' {...props} />;
  }

ItemIndicator.displayName = 'ItemIndicatorNativeSelect';

function Group({ ref, asChild, ...props  }: GroupProps & { ref?: React.Ref<GroupRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='group' {...props} />;
}

Group.displayName = 'GroupNativeSelect';

function Label({ ref, asChild, ...props  }: LabelProps & { ref?: React.Ref<LabelRef> }) {
  const Component = asChild ? Slot.Text : Text;
  return <Component ref={ref} {...props} />;
}

Label.displayName = 'LabelNativeSelect';

function Separator({ ref, asChild, decorative, ...props  }: SeparatorProps & { ref?: React.Ref<SeparatorRef> }) {
    const Component = asChild ? Slot.View : View;
    return <Component role={decorative ? 'presentation' : 'separator'} ref={ref} {...props} />;
  }

Separator.displayName = 'SeparatorNativeSelect';

const ScrollUpButton = ({ children }: ScrollUpButtonProps) => {
  return <>{children}</>;
};

const ScrollDownButton = ({ children }: ScrollDownButtonProps) => {
  return <>{children}</>;
};

const Viewport = ({ children }: ViewportProps) => {
  return <>{children}</>;
};

export {
  Content,
  Group,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Overlay,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  useItemContext,
  useRootContext,
  Value,
  Viewport,
};

function onStartShouldSetResponder() {
  return true;
}
