import * as Dialog from '@radix-ui/react-dialog';
import {
  useAugmentedRef,
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

const Root = (
  {
    ref,
    asChild,
    open: openProp,
    defaultOpen,
    onOpenChange: onOpenChangeProp,
    ...viewProps
  }: RootProps & {
    ref: React.RefObject<RootRef>;
  }
) => {
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

const Trigger = (
  {
    ref,
    asChild,
    onPress: onPressProp,
    role: _role,
    disabled,
    ...props
  }: TriggerProps & {
    ref: React.RefObject<TriggerRef>;
  }
) => {
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
      augRef.dataset.state = open ? 'open' : 'closed';
      augRef.type = 'button';
    }
  }, [open]);

  const Component = asChild ? Slot : Pressable;
  return (
    <Dialog.Trigger disabled={disabled ?? undefined} asChild>
      <Component
        ref={augmentedRef}
        onPress={onPress}
        role='button'
        disabled={disabled}
        {...props}
      />
    </Dialog.Trigger>
  );
};

Trigger.displayName = 'TriggerWebDialog';

function Portal({ forceMount, container, children }: PortalProps) {
  return <Dialog.Portal forceMount={forceMount} children={children} container={container} />;
}

const Overlay = (
  {
    ref,
    asChild,
    forceMount,
    ...props
  }: OverlayProps & {
    ref: React.RefObject<OverlayRef>;
  }
) => {
  const Component = asChild ? Slot : Pressable;
  return (
    <Dialog.Overlay forceMount={forceMount}>
      <Component ref={ref} {...props} />
    </Dialog.Overlay>
  );
};

Overlay.displayName = 'OverlayWebDialog';

const Content = (
  {
    ref,
    asChild,
    forceMount,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onInteractOutside,
    onPointerDownOutside,
    ...props
  }: ContentProps & {
    ref: React.RefObject<ContentRef>;
  }
) => {
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

const Close = (
  {
    ref,
    asChild,
    onPress: onPressProp,
    disabled,
    ...props
  }: CloseProps & {
    ref: React.RefObject<CloseRef>;
  }
) => {
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

  const Component = asChild ? Slot : Pressable;
  return (
    <>
      <Dialog.Close disabled={disabled ?? undefined} asChild>
        <Component
          ref={augmentedRef}
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

const Title = (
  {
    ref,
    asChild,
    ...props
  }: TitleProps & {
    ref: React.RefObject<TitleRef>;
  }
) => {
  const Component = asChild ? Slot : Text;
  return (
    <Dialog.Title asChild>
      <Component ref={ref} {...props} />
    </Dialog.Title>
  );
};

Title.displayName = 'TitleWebDialog';

const Description = (
  {
    ref,
    asChild,
    ...props
  }: DescriptionProps & {
    ref: React.RefObject<DescriptionRef>;
  }
) => {
  const Component = asChild ? Slot : Text;
  return (
    <Dialog.Description asChild>
      <Component ref={ref} {...props} />
    </Dialog.Description>
  );
};

Description.displayName = 'DescriptionWebDialog';

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger, useRootContext };
