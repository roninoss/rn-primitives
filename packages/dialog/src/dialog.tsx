import { useControllableState } from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import * as Slot from '@rn-primitives/slot';
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

function Root({ ref, asChild, open: openProp, defaultOpen, onOpenChange: onOpenChangeProp, ...viewProps  }: RootProps & { ref?: React.Ref<RootRef> }) {
    const nativeID = React.useId();
    const [open = false, onOpenChange] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChangeProp,
    });

    const Component = asChild ? Slot.View : View;
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

Root.displayName = 'RootNativeDialog';

function useRootContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog compound components cannot be rendered outside the Dialog component');
  }
  return context;
}

function Trigger({ ref, asChild, onPress: onPressProp, disabled = false, ...props  }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
    const { open, onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      const newValue = !open;
      onOpenChange(newValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
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

function Overlay({ ref, asChild, forceMount, closeOnPress = true, onPress: OnPressProp, ...props  }: OverlayProps & { ref?: React.Ref<OverlayRef> }) {
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

    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} onPress={onPress} {...props} />;
  }

Overlay.displayName = 'OverlayNativeDialog';

function Content({ ref, asChild, forceMount, ...props  }: ContentProps & { ref?: React.Ref<ContentRef> }) {
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

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        role='dialog'
        nativeID={nativeID}
        aria-labelledby={`${nativeID}_label`}
        aria-describedby={`${nativeID}_desc`}
        aria-modal={true}
        onStartShouldSetResponder={onStartShouldSetResponder}
        {...props}
      />
    );
  }

Content.displayName = 'ContentNativeDialog';

function Close({ ref, asChild, onPress: onPressProp, disabled = false, ...props  }: CloseProps & { ref?: React.Ref<CloseRef> }) {
    const { onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onOpenChange(false);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
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

Close.displayName = 'CloseNativeDialog';

function Title({ ref, ...props }: TitleProps & { ref?: React.Ref<TitleRef> }) {
  const { nativeID } = useRootContext();
  return <Text ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />;
}

Title.displayName = 'TitleNativeDialog';

function Description({ ref, ...props }: DescriptionProps & { ref?: React.Ref<DescriptionRef> }) {
  const { nativeID } = useRootContext();
  return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
}

Description.displayName = 'DescriptionNativeDialog';

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger, useRootContext };

function onStartShouldSetResponder() {
  return true;
}
