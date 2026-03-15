import { useComposedRefs, useRelativePosition, type LayoutPosition } from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import {
  BackHandler,
  Pressable,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import type {
  CloseProps,
  CloseRef,
  ContentProps,
  ContentRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
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

Root.displayName = 'RootNativePopover';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Popover compound components cannot be rendered outside the Popover component');
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
  const { onOpenChange, open, setTriggerPosition } = useRootContext();
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
    onOpenChange(!open);
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
      {...props}
    />
  );
};

Trigger.displayName = 'TriggerNativePopover';

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

Overlay.displayName = 'OverlayNativePopover';
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
  onOpenAutoFocus: _onOpenAutoFocus,
  ref,
  ...props
}: ContentComponentProps) => {
  const {
    open,
    onOpenChange,
    contentLayout,
    nativeID,
    setContentLayout,
    setTriggerPosition,
    triggerPosition,
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
      role='dialog'
      nativeID={nativeID}
      aria-modal={true}
      style={[positionStyle, style]}
      onLayout={onLayout}
      onStartShouldSetResponder={onStartShouldSetResponder}
      {...props}
    />
  );
};

Content.displayName = 'ContentNativePopover';
type CloseComponentProps = CloseProps & React.RefAttributes<CloseRef>;

const Close = ({
  asChild,
  onPress: onPressProp,
  disabled = false,
  ref,
  ...props
}: CloseComponentProps) => {
  const { onOpenChange, setContentLayout, setTriggerPosition } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    setTriggerPosition(null);
    setContentLayout(null);
    onOpenChange(false);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      {...props}
    />
  );
};

Close.displayName = 'CloseNativePopover';

export { Close, Content, Overlay, Portal, Root, Trigger, useRootContext };

function onStartShouldSetResponder() {
  return true;
}
