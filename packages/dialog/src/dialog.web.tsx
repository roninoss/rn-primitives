import * as Dialog from '@radix-ui/react-dialog';
import {
  useComposedRefs,
  useControllableState,
  useIsomorphicLayoutEffect,
} from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import type {
  CloseProps,
  CloseRef,
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootContext,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
  TriggerProps,
  TriggerRef,
} from './types';

const DialogContext = React.createContext<RootContext | null>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  open: openProp,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  ref,
  ...viewProps
}: RootComponentProps) => {
  const [open = false, onOpenChange] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChangeProp,
  });
  const Component = asChild ? Slot : View;
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </Dialog.Root>
    </DialogContext.Provider>
  );
};

Root.displayName = 'RootWebDialog';

function useRootContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog compound components cannot be rendered outside the Dialog component');
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
  const triggerRef = React.useRef<TriggerRef>(null);
  const composedRef = useComposedRefs(ref, triggerRef);
  const { onOpenChange, open } = useRootContext();
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
    <Dialog.Trigger disabled={disabled ?? undefined} asChild>
      <Component ref={composedRef} onPress={onPress} role='button' disabled={disabled} {...props} />
    </Dialog.Trigger>
  );
};

Trigger.displayName = 'TriggerWebDialog';

function Portal({ forceMount, container, children }: PortalProps) {
  return <Dialog.Portal forceMount={forceMount} children={children} container={container} />;
}
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({ asChild, forceMount, ref, ...props }: OverlayComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return (
    <Dialog.Overlay forceMount={forceMount}>
      <Component ref={ref} {...props} />
    </Dialog.Overlay>
  );
};

Overlay.displayName = 'OverlayWebDialog';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({
  asChild,
  forceMount,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onInteractOutside,
  onPointerDownOutside,
  ref,
  ...props
}: ContentComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Dialog.Content
      onOpenAutoFocus={onOpenAutoFocus}
      onCloseAutoFocus={onCloseAutoFocus}
      onEscapeKeyDown={onEscapeKeyDown}
      onInteractOutside={onInteractOutside}
      onPointerDownOutside={onPointerDownOutside}
      forceMount={forceMount}
    >
      <Component ref={ref} {...props} />
    </Dialog.Content>
  );
};

Content.displayName = 'ContentWebDialog';
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
      <Dialog.Close disabled={disabled ?? undefined} asChild>
        <Component
          ref={composedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </Dialog.Close>
    </>
  );
};

Close.displayName = 'CloseWebDialog';
type TitleComponentProps = TitleProps & React.RefAttributes<TitleRef>;

const Title = ({ asChild, ref, ...props }: TitleComponentProps) => {
  const Component = asChild ? Slot : Text;
  return (
    <Dialog.Title asChild>
      <Component ref={ref} {...props} />
    </Dialog.Title>
  );
};

Title.displayName = 'TitleWebDialog';
type DescriptionComponentProps = DescriptionProps & React.RefAttributes<DescriptionRef>;

const Description = ({ asChild, ref, ...props }: DescriptionComponentProps) => {
  const Component = asChild ? Slot : Text;
  return (
    <Dialog.Description asChild>
      <Component ref={ref} {...props} />
    </Dialog.Description>
  );
};

Description.displayName = 'DescriptionWebDialog';

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger, useRootContext };
