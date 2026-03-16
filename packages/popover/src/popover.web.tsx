import * as Popover from '@radix-ui/react-popover';
import { useComposedRefs, useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
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

const RootContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);
type RootComponentProps = RootProps & {
  onOpenChange?: (open: boolean) => void;
} & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  onOpenChange: onOpenChangeProp,
  ref,
  ...viewProps
}: RootComponentProps) => {
  const [open, setOpen] = React.useState(false);

  function onOpenChange(value: boolean) {
    setOpen(value);
    onOpenChangeProp?.(value);
  }
  const Component = asChild ? Slot : View;
  return (
    <RootContext.Provider value={{ open, onOpenChange }}>
      <Popover.Root open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </Popover.Root>
    </RootContext.Provider>
  );
};

Root.displayName = 'RootWebPopover';

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
  role: _role,
  disabled,
  ref,
  ...props
}: TriggerComponentProps) => {
  const { onOpenChange, open } = useRootContext();
  const triggerRef = React.useRef<TriggerRef>(null);

  const openTriggerEvent = React.useEffectEvent(() => {
    onOpenChange(true);
  });
  const closeTriggerEvent = React.useEffectEvent(() => {
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
    if (onPressProp) {
      onPressProp(ev);
    }
    onOpenChange(!open);
  }

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const augRef = triggerRef.current as unknown as HTMLButtonElement;
      augRef.dataset.state = open ? 'open' : 'closed';
      augRef.type = 'button';
    }
  }, [open]);

  const Component = asChild ? Slot : Pressable;
  return (
    <Popover.Trigger disabled={disabled ?? undefined} asChild>
      <Component ref={composedRef} onPress={onPress} role='button' disabled={disabled} {...props} />
    </Popover.Trigger>
  );
};

Trigger.displayName = 'TriggerWebPopover';

function Portal({ forceMount, container, children }: PortalProps) {
  return <Popover.Portal forceMount={forceMount} children={children} container={container} />;
}
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({ asChild, forceMount, ref, ...props }: OverlayComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} {...props} />;
};

Overlay.displayName = 'OverlayWebPopover';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({
  asChild = false,
  forceMount,
  align = 'start',
  side = 'bottom',
  sideOffset = 0,
  alignOffset = 0,
  avoidCollisions = true,
  insets: _insets,
  disablePositioningStyle: _disablePositioningStyle,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onInteractOutside,
  onPointerDownOutside,
  onOpenAutoFocus,
  ref,
  ...props
}: ContentComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Popover.Content
      onCloseAutoFocus={onCloseAutoFocus}
      onEscapeKeyDown={onEscapeKeyDown}
      onInteractOutside={onInteractOutside}
      onPointerDownOutside={onPointerDownOutside}
      forceMount={forceMount}
      align={align}
      side={side}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      avoidCollisions={avoidCollisions}
      onOpenAutoFocus={onOpenAutoFocus}
    >
      <Component ref={ref} {...props} />
    </Popover.Content>
  );
};

Content.displayName = 'ContentWebPopover';
type CloseComponentProps = CloseProps & React.RefAttributes<CloseRef>;

const Close = ({ asChild, onPress: onPressProp, disabled, ref, ...props }: CloseComponentProps) => {
  const closeRef = React.useRef<CloseRef>(null);
  const composedRef = useComposedRefs(ref, closeRef);
  const { onOpenChange, open } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (onPressProp) {
      onPressProp(ev);
    }
    onOpenChange(!open);
  }

  useIsomorphicLayoutEffect(() => {
    if (closeRef.current) {
      const augRef = closeRef.current as unknown as HTMLButtonElement;
      augRef.type = 'button';
    }
  }, []);

  const Component = asChild ? Slot : Pressable;
  return (
    <>
      <Popover.Close disabled={disabled ?? undefined} asChild>
        <Component
          ref={composedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </Popover.Close>
    </>
  );
};

Close.displayName = 'CloseWebPopover';

export { Close, Content, Overlay, Portal, Root, Trigger, useRootContext };
