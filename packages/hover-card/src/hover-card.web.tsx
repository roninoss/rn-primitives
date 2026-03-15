import * as HoverCard from '@radix-ui/react-hover-card';
import { useComposedRefs } from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  openDelay,
  closeDelay,
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
};

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
type TriggerComponentProps = TriggerProps & React.RefAttributes<TriggerRef>;

const Trigger = ({ asChild, ref, ...props }: TriggerComponentProps) => {
  const { onOpenChange } = useRootContext();
  const triggerRef = React.useRef<TriggerRef>(null);
  const composedRef = useComposedRefs(triggerRef);

  React.useImperativeHandle(
    ref,
    () =>
      ({
        ...(triggerRef.current ?? {}),
        open() {
          onOpenChange(true);
        },
        close() {
          onOpenChange(false);
        },
      } as TriggerRef),
    [onOpenChange]
  );

  const Component = asChild ? Slot : Pressable;
  return (
    <HoverCard.Trigger asChild>
      <Component ref={composedRef} {...props} />
    </HoverCard.Trigger>
  );
};

Trigger.displayName = 'TriggerWebHoverCard';

function Portal({ forceMount, container, children }: PortalProps) {
  return <HoverCard.Portal forceMount={forceMount} container={container} children={children} />;
}
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({ asChild, ref, ...props }: OverlayComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} {...props} />;
};

Overlay.displayName = 'OverlayWebHoverCard';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({
  asChild = false,
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
  ref,
  ...props
}: ContentComponentProps) => {
  const Component = asChild ? Slot : Pressable;
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
};

Content.displayName = 'ContentWebHoverCard';

export { Content, Overlay, Portal, Root, Trigger, useRootContext };
