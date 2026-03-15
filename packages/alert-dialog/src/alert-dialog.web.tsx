import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {
  useComposedRefs,
  useControllableState,
  useIsomorphicLayoutEffect,
} from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import type {
  ActionProps,
  ActionRef,
  CancelProps,
  CancelRef,
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

const AlertDialogContext = React.createContext<RootContext | null>(null);
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
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      <AlertDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </AlertDialog.Root>
    </AlertDialogContext.Provider>
  );
};

Root.displayName = 'RootAlertWebDialog';

function useRootContext() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      'AlertDialog compound components cannot be rendered outside the AlertDialog component'
    );
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
    <AlertDialog.Trigger disabled={disabled ?? undefined} asChild>
      <Component ref={composedRef} onPress={onPress} role='button' disabled={disabled} {...props} />
    </AlertDialog.Trigger>
  );
};

Trigger.displayName = 'TriggerAlertWebDialog';

function Portal({ forceMount, container, children }: PortalProps) {
  return <AlertDialog.Portal forceMount={forceMount} children={children} container={container} />;
}
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({ asChild, forceMount, ref, ...props }: OverlayComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <AlertDialog.Overlay forceMount={forceMount}>
      <Component ref={ref} {...props} />
    </AlertDialog.Overlay>
  );
};

Overlay.displayName = 'OverlayAlertWebDialog';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({
  asChild,
  forceMount,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  ref,
  ...props
}: ContentComponentProps) => {
  const contentRef = React.useRef<ContentRef>(null);
  const composedRef = useComposedRefs(ref, contentRef);
  const { open } = useRootContext();

  useIsomorphicLayoutEffect(() => {
    if (contentRef.current) {
      const augRef = contentRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = open ? 'open' : 'closed';
    }
  }, [open]);

  const Component = asChild ? Slot : View;
  return (
    <AlertDialog.Content
      onOpenAutoFocus={onOpenAutoFocus}
      onCloseAutoFocus={onCloseAutoFocus}
      onEscapeKeyDown={onEscapeKeyDown}
      forceMount={forceMount}
      asChild
    >
      <Component ref={composedRef} {...props} />
    </AlertDialog.Content>
  );
};

Content.displayName = 'ContentAlertWebDialog';
type CancelComponentProps = CancelProps & React.RefAttributes<CancelRef>;

const Cancel = ({
  asChild,
  onPress: onPressProp,
  disabled,
  ref,
  ...props
}: CancelComponentProps) => {
  const cancelRef = React.useRef<CancelRef>(null);
  const composedRef = useComposedRefs(ref, cancelRef);
  const { onOpenChange, open } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (onPressProp) {
      onPressProp(ev);
    }
    onOpenChange(!open);
  }

  useIsomorphicLayoutEffect(() => {
    if (cancelRef.current) {
      const augRef = cancelRef.current as unknown as HTMLButtonElement;
      augRef.type = 'button';
    }
  }, []);

  const Component = asChild ? Slot : Pressable;
  return (
    <>
      <AlertDialog.Cancel disabled={disabled ?? undefined} asChild>
        <Component
          ref={composedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </AlertDialog.Cancel>
    </>
  );
};

Cancel.displayName = 'CancelAlertWebDialog';
type ActionComponentProps = ActionProps & React.RefAttributes<ActionRef>;

const Action = ({
  asChild,
  onPress: onPressProp,
  disabled,
  ref,
  ...props
}: ActionComponentProps) => {
  const actionRef = React.useRef<ActionRef>(null);
  const composedRef = useComposedRefs(ref, actionRef);
  const { onOpenChange, open } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    if (onPressProp) {
      onPressProp(ev);
    }
    onOpenChange(!open);
  }

  useIsomorphicLayoutEffect(() => {
    if (actionRef.current) {
      const augRef = actionRef.current as unknown as HTMLButtonElement;
      augRef.type = 'button';
    }
  }, []);

  const Component = asChild ? Slot : Pressable;
  return (
    <>
      <AlertDialog.Action disabled={disabled ?? undefined} asChild>
        <Component
          ref={composedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </AlertDialog.Action>
    </>
  );
};

Action.displayName = 'ActionAlertWebDialog';
type TitleComponentProps = TitleProps & React.RefAttributes<TitleRef>;

const Title = ({ asChild, ref, ...props }: TitleComponentProps) => {
  const Component = asChild ? Slot : Text;
  return (
    <AlertDialog.Title asChild>
      <Component ref={ref} {...props} />
    </AlertDialog.Title>
  );
};

Title.displayName = 'TitleAlertWebDialog';
type DescriptionComponentProps = DescriptionProps & React.RefAttributes<DescriptionRef>;

const Description = ({ asChild, ref, ...props }: DescriptionComponentProps) => {
  const Component = asChild ? Slot : Text;
  return (
    <AlertDialog.Description asChild>
      <Component ref={ref} {...props} />
    </AlertDialog.Description>
  );
};

Description.displayName = 'DescriptionAlertWebDialog';

export {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
  useRootContext,
};
