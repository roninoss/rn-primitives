import * as Popover from '@radix-ui/react-popover';
import { useAugmentedRef, useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import * as Slot from '@rn-primitives/slot';
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

function Root({ ref, asChild, onOpenChange: onOpenChangeProp, ...viewProps }: RootProps & { onOpenChange?: (open: boolean) => void; ref?: React.Ref<RootRef> }) {
  const [open, setOpen] = React.useState(false);

  function onOpenChange(value: boolean) {
    setOpen(value);
    onOpenChangeProp?.(value);
  }
  const Component = asChild ? Slot.View : View;
  return (
    <RootContext.Provider value={{ open, onOpenChange }}>
      <Popover.Root open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </Popover.Root>
    </RootContext.Provider>
  );
}

Root.displayName = 'RootWebPopover';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Popover compound components cannot be rendered outside the Popover component');
  }
  return context;
}

function Trigger({ ref, asChild, onPress: onPressProp, role: _role, disabled, ...props }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
    const { onOpenChange, open } = useRootContext();
    const augmentedRef = useAugmentedRef({
      ref,
      methods: {
        open() {
          onOpenChange(true);
        },
        close() {
          onOpenChange(false);
        },
      },
    });
    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      onOpenChange(!open);
    }

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.dataset.state = open ? 'open' : 'closed';
        augRef.type = 'button';
      }
    }, [open]);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Popover.Trigger disabled={disabled ?? undefined} asChild>
        <Component
          ref={augmentedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </Popover.Trigger>
    );
  }

Trigger.displayName = 'TriggerWebPopover';

function Portal({ forceMount, container, children }: PortalProps) {
  return <Popover.Portal forceMount={forceMount} children={children} container={container} />;
}

function Overlay({ ref, asChild, forceMount, ...props }: OverlayProps & { ref?: React.Ref<OverlayRef> }) {
    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} {...props} />;
  }

Overlay.displayName = 'OverlayWebPopover';

function Content({ ref, asChild = false,
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
      ...props }: ContentProps & { ref?: React.Ref<ContentRef> }) {
    const Component = asChild ? Slot.View : View;
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
  }

Content.displayName = 'ContentWebPopover';

function Close({ ref, asChild, onPress: onPressProp, disabled, ...props }: CloseProps & { ref?: React.Ref<CloseRef> }) {
    const augmentedRef = useAugmentedRef({ ref });
    const { onOpenChange, open } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      onOpenChange(!open);
    }

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.type = 'button';
      }
    }, []);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <Popover.Close disabled={disabled ?? undefined} asChild>
          <Component
            ref={augmentedRef}
            onPress={onPress}
            role='button'
            disabled={disabled}
            {...props}
          />
        </Popover.Close>
      </>
    );
  }

Close.displayName = 'CloseWebPopover';

export { Close, Content, Overlay, Portal, Root, Trigger, useRootContext };
