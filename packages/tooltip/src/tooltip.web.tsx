import * as Tooltip from '@radix-ui/react-tooltip';
import { useComposedRefs, useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  delayDuration,
  skipDelayDuration,
  disableHoverableContent,
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
};

Root.displayName = 'RootWebTooltip';

function useTooltipContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Tooltip compound components cannot be rendered outside the Tooltip component');
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
  const { onOpenChange, open } = useTooltipContext();
  const triggerRef = React.useRef<TriggerRef>(null);
  const composedRef = useComposedRefs(triggerRef);

  function openTrigger() {
    onOpenChange(true);
  }

  function closeTrigger() {
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
    [onOpenChange]
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
    <Tooltip.Trigger disabled={disabled ?? undefined} asChild>
      <Component ref={composedRef} onPress={onPress} role='button' disabled={disabled} {...props} />
    </Tooltip.Trigger>
  );
};

Trigger.displayName = 'TriggerWebTooltip';

function Portal({ forceMount, container, children }: PortalProps) {
  return <Tooltip.Portal forceMount={forceMount} children={children} container={container} />;
}
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({ asChild, forceMount, ref, ...props }: OverlayComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} {...props} />;
};

Overlay.displayName = 'OverlayWebTooltip';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({
  asChild = false,
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
  ref,
  ...props
}: ContentComponentProps) => {
  const Component = asChild ? Slot : View;
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
};

Content.displayName = 'ContentWebTooltip';

export { Content, Overlay, Portal, Root, Trigger };
