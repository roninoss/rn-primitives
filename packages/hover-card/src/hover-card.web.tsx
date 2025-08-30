import * as HoverCard from '@radix-ui/react-hover-card';
import { useAugmentedRef } from '@rn-primitives/hooks';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import type {
  ContentProps,
  ContentRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  SharedRootContext,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './types';

const HoverCardContext = React.createContext<SharedRootContext | null>(null);

function Root({ ref, asChild, openDelay, closeDelay, onOpenChange: onOpenChangeProp, ...viewProps  }: RootProps & { ref?: React.Ref<RootRef> }) {
    const [open, setOpen] = React.useState(false);

    function onOpenChange(value: boolean) {
      setOpen(value);
      onOpenChangeProp?.(value);
    }

    const Component = asChild ? Slot.View : View;
    return (
      <HoverCardContext.Provider value={{ open, onOpenChange }}>
        <HoverCard.Root
          open={open}
          onOpenChange={onOpenChange}
          openDelay={openDelay}
          closeDelay={closeDelay}
        >
          <Component ref={ref} {...viewProps} />
        </HoverCard.Root>
      </HoverCardContext.Provider>
    );
  }

Root.displayName = 'RootWebHoverCard';

function useRootContext() {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error(
      'HoverCard compound components cannot be rendered outside the HoverCard component'
    );
  }
  return context;
}

function Trigger({ ref, asChild, ...props  }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
  const { onOpenChange } = useRootContext();
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

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <HoverCard.Trigger asChild>
      <Component ref={augmentedRef} {...props} />
    </HoverCard.Trigger>
  );
});

Trigger.displayName = 'TriggerWebHoverCard';

function Portal({ forceMount, container, children }: PortalProps) {
  return <HoverCard.Portal forceMount={forceMount} container={container} children={children} />;
}

function Overlay({ ref, asChild, ...props  }: OverlayProps & { ref?: React.Ref<OverlayRef> }) {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} {...props} />;
});

Overlay.displayName = 'OverlayWebHoverCard';

function Content({ ref, asChild = false,
      forceMount,
      align,
      side,
      sideOffset,
      alignOffset = 0,
      avoidCollisions = true,
      insets,
      loop: _loop,
      onCloseAutoFocus: _onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      collisionBoundary,
      sticky,
      hideWhenDetached,
      ...props
     }: ContentProps & { ref?: React.Ref<ContentRef> }) {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <HoverCard.Content
        forceMount={forceMount}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={insets}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        onFocusOutside={onFocusOutside}
        onInteractOutside={onInteractOutside}
        collisionBoundary={collisionBoundary}
        sticky={sticky}
        hideWhenDetached={hideWhenDetached}
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <Component ref={ref} {...props} />
      </HoverCard.Content>
    );
  }

Content.displayName = 'ContentWebHoverCard';

export { Content, Overlay, Portal, Root, Trigger, useRootContext };
