import {
  useComposedRefs,
  useControllableState,
  useEffectEvent,
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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  value: valueProp,
  defaultValue,
  onValueChange: onValueChangeProp,
  onOpenChange: onOpenChangeProp,
  disabled,
  ref,
  ...viewProps
}: RootComponentProps) => {
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

  const Component = asChild ? Slot : View;
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
};

Root.displayName = 'RootNativeSelect';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Select compound components cannot be rendered outside the Select component');
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
  const { open, onOpenChange, disabled: disabledRoot, setTriggerPosition } = useRootContext();
  const triggerRef = React.useRef<TriggerRef>(null);

  function measureTrigger() {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerPosition({ width, pageX, pageY: pageY, height });
    });
  }

  const openTriggerEvent = useEffectEvent(() => {
    onOpenChange(true);
    measureTrigger();
  });
  const closeTriggerEvent = useEffectEvent(() => {
    setTriggerPosition(null);
    onOpenChange(false);
  });

  const composedRef = useComposedRefs(
    triggerRef,
    ref,
    React.useCallback((node: TriggerRef | null) => {
      if (!node) return;
      node.open = () => openTriggerEvent();
      node.close = () => closeTriggerEvent();
    }, [])
  );

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    measureTrigger();
    onOpenChange(!open);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      ref={composedRef}
      aria-disabled={disabled ?? undefined}
      role='combobox'
      onPress={onPress}
      disabled={disabled ?? disabledRoot}
      aria-expanded={open}
      {...props}
    />
  );
};

Trigger.displayName = 'TriggerNativeSelect';
type ValueComponentProps = ValueProps & React.RefAttributes<ValueRef>;

const Value = ({ asChild, placeholder, ref, ...props }: ValueComponentProps) => {
  const { value } = useRootContext();
  const Component = asChild ? Slot : Text;
  return (
    <Component ref={ref} {...props}>
      {value?.label ?? placeholder}
    </Component>
  );
};

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
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({
  asChild,
  forceMount,
  onPress: OnPressProp,
  closeOnPress = true,
  ref,
  ...props
}: OverlayComponentProps) => {
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

  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} onPress={onPress} {...props} />;
};

Overlay.displayName = 'OverlayNativeSelect';
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
  position: _position,
  ref,
  ...props
}: ContentComponentProps) => {
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

  const Component = asChild ? Slot : View;
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
};

Content.displayName = 'ContentNativeSelect';

const ItemContext = React.createContext<{
  itemValue: string;
  label: string;
} | null>(null);
type ItemComponentProps = ItemProps & React.RefAttributes<ItemRef>;

const Item = ({
  asChild,
  value: itemValue,
  label,
  onPress: onPressProp,
  disabled = false,
  closeOnPress = true,
  ref,
  ...props
}: ItemComponentProps) => {
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

  const Component = asChild ? Slot : Pressable;
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
};

Item.displayName = 'ItemNativeSelect';

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error('Item compound components cannot be rendered outside of an Item component');
  }
  return context;
}
type ItemTextComponentProps = ItemTextProps & React.RefAttributes<ItemTextRef>;

const ItemText = ({ asChild, ref, ...props }: ItemTextComponentProps) => {
  const { label } = useItemContext();

  const Component = asChild ? Slot : Text;
  return (
    <Component ref={ref} {...props}>
      {label}
    </Component>
  );
};

ItemText.displayName = 'ItemTextNativeSelect';
type ItemIndicatorComponentProps = ItemIndicatorProps & React.RefAttributes<ItemIndicatorRef>;

const ItemIndicator = ({ asChild, forceMount, ref, ...props }: ItemIndicatorComponentProps) => {
  const { itemValue } = useItemContext();
  const { value } = useRootContext();

  if (!forceMount) {
    if (value?.value !== itemValue) {
      return null;
    }
  }
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='presentation' {...props} />;
};

ItemIndicator.displayName = 'ItemIndicatorNativeSelect';
type GroupComponentProps = GroupProps & React.RefAttributes<GroupRef>;

const Group = ({ asChild, ref, ...props }: GroupComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component ref={ref} role='group' {...props} />;
};

Group.displayName = 'GroupNativeSelect';
type LabelComponentProps = LabelProps & React.RefAttributes<LabelRef>;

const Label = ({ asChild, ref, ...props }: LabelComponentProps) => {
  const Component = asChild ? Slot : Text;
  return <Component ref={ref} {...props} />;
};

Label.displayName = 'LabelNativeSelect';
type SeparatorComponentProps = SeparatorProps & React.RefAttributes<SeparatorRef>;

const Separator = ({ asChild, decorative, ref, ...props }: SeparatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return <Component role={decorative ? 'presentation' : 'separator'} ref={ref} {...props} />;
};

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
