import * as Tooltip from '@radix-ui/react-tooltip';
import { useAugmentedRef, useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type {
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

function Root({ ref, asChild,
      delayDuration,
      skipDelayDuration,
      disableHoverableContent,
      onOpenChange: onOpenChangeProp,
      ...viewProps }: RootProps & { ref?: React.Ref<RootRef> }) {
    const [open, setOpen] = React.useState(false);

    function onOpenChange(value: boolean) {
      setOpen(value);
      onOpenChangeProp?.(value);
    }

    const Component = asChild ? Slot.View : View;
    return (
      <RootContext.Provider value={{ open, onOpenChange }}>
        <Tooltip.Provider
          delayDuration={delayDuration}
          skipDelayDuration={skipDelayDuration}
          disableHoverableContent={disableHoverableContent}
        >
          <Tooltip.Root
            open={open}
            onOpenChange={onOpenChange}
            delayDuration={delayDuration}
            disableHoverableContent={disableHoverableContent}
          >
            <Component ref={ref} {...viewProps} />
          </Tooltip.Root>
        </Tooltip.Provider>
      </RootContext.Provider>
    );
  }

Root.displayName = 'RootWebTooltip';

function useTooltipContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Tooltip compound components cannot be rendered outside the Tooltip component');
  }
  return context;
}

function Trigger({ ref, asChild, onPress: onPressProp, role: _role, disabled, ...props }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
    const { onOpenChange, open } = useTooltipContext();
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
      <Tooltip.Trigger disabled={disabled ?? undefined} asChild>
        <Component
          ref={augmentedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </Tooltip.Trigger>
    );
  }

Trigger.displayName = 'TriggerWebTooltip';

function Portal({ forceMount, container, children }: PortalProps) {
  return <Tooltip.Portal forceMount={forceMount} children={children} container={container} />;
}

function Overlay({ ref, asChild, forceMount, ...props }: OverlayProps & { ref?: React.Ref<OverlayRef> }) {
    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} {...props} />;
  }

Overlay.displayName = 'OverlayWebTooltip';

function Content({ ref, asChild = false,
      forceMount,
      align = 'center',
      side = 'top',
      sideOffset = 0,
      alignOffset = 0,
      avoidCollisions = true,
      insets: _insets,
      disablePositioningStyle: _disablePositioningStyle,
      onCloseAutoFocus: _onCloseAutoFocus,
      onEscapeKeyDown,
      onInteractOutside: _onInteractOutside,
      onPointerDownOutside,
      sticky,
      hideWhenDetached,
      ...props }: ContentProps & { ref?: React.Ref<ContentRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <Tooltip.Content
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        forceMount={forceMount}
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        sticky={sticky}
        hideWhenDetached={hideWhenDetached}
      >
        <Component ref={ref} {...props} />
      </Tooltip.Content>
    );
  }

Content.displayName = 'ContentWebTooltip';

export { Content, Overlay, Portal, Root, Trigger };
