import { useControllableState } from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { BackHandler, GestureResponderEvent, Pressable, Text, View } from 'react-native';
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

const DialogContext = React.createContext<(RootContext & { nativeID: string }) | null>(null);

const Root = React.forwardRef<RootRef, RootProps>(
  ({ asChild, open: openProp, defaultOpen, onOpenChange: onOpenChangeProp, ...viewProps }, ref) => {
    const nativeID = React.useId();
    const [open = false, onOpenChange] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChangeProp,
    });

    const Component = asChild ? Slot : View;
    return (
      <DialogContext.Provider
        value={{
          open,
          onOpenChange,
          nativeID,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </DialogContext.Provider>
    );
  }
);

Root.displayName = 'RootNativeDialog';

function useRootContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog compound components cannot be rendered outside the Dialog component');
  }
  return context;
}

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { open, onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      const newValue = !open;
      onOpenChange(newValue);
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
  }
);

Trigger.displayName = 'TriggerNativeDialog';

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: PortalProps) {
  const value = useRootContext();

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
      <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
    </RNPPortal>
  );
}

const Overlay = React.forwardRef<OverlayRef, OverlayProps>(
  ({ asChild, forceMount, closeOnPress = true, onPress: OnPressProp, ...props }, ref) => {
    const { open, onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        onOpenChange(!open);
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
  }
);

Overlay.displayName = 'OverlayNativeDialog';

const Content = React.forwardRef<ContentRef, ContentProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { open, nativeID, onOpenChange } = useRootContext();

    React.useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        onOpenChange(false);
        return true;
      });

      return () => {
        backHandler.remove();
      };
    }, []);

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
        accessibilityLabelledBy={`${nativeID}_label`}
        aria-describedby={`${nativeID}_desc`}
        aria-modal={true}
        onStartShouldSetResponder={onStartShouldSetResponder}
        {...props}
      />
    );
  }
);

Content.displayName = 'ContentNativeDialog';

const Close = React.forwardRef<CloseRef, CloseProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
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
  }
);

Close.displayName = 'CloseNativeDialog';

const Title = React.forwardRef<TitleRef, TitleProps>((props, ref) => {
  const { nativeID } = useRootContext();
  return <Text ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />;
});

Title.displayName = 'TitleNativeDialog';

const Description = React.forwardRef<DescriptionRef, DescriptionProps>((props, ref) => {
  const { nativeID } = useRootContext();
  return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
});

Description.displayName = 'DescriptionNativeDialog';

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger, useRootContext };

function onStartShouldSetResponder() {
  return true;
}
