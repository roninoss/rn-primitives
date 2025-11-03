import { useControllableState } from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { BackHandler, Pressable, Text, View, type GestureResponderEvent } from 'react-native';
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

const AlertDialogContext = React.createContext<(RootContext & { nativeID: string }) | null>(null);

function Root({ ref, asChild, open: openProp, defaultOpen, onOpenChange: onOpenChangeProp, ...viewProps }: RootProps & { ref?: React.Ref<RootRef> }) {
    const nativeID = React.useId();
    const [open = false, onOpenChange] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChangeProp,
    });
    const Component = asChild ? Slot.View : View;
    return (
      <AlertDialogContext.Provider
        value={{
          open,
          onOpenChange,
          nativeID,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </AlertDialogContext.Provider>
    );
  }

Root.displayName = 'RootNativeAlertDialog';

function useRootContext() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      'AlertDialog compound components cannot be rendered outside the AlertDialog component'
    );
  }
  return context;
}

function Trigger({ ref, asChild, onPress: onPressProp, disabled = false, ...props }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
    const { open: value, onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      onOpenChange(!value);
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

Trigger.displayName = 'TriggerNativeAlertDialog';

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
      <AlertDialogContext.Provider value={value}>{children}</AlertDialogContext.Provider>
    </RNPPortal>
  );
}

function Overlay({ ref, asChild, forceMount, ...props }: OverlayProps & { ref?: React.Ref<OverlayRef> }) {
    const { open: value } = useRootContext();

    if (!forceMount) {
      if (!value) {
        return null;
      }
    }

    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} {...props} />;
  }

Overlay.displayName = 'OverlayNativeAlertDialog';

function Content({ ref, asChild, forceMount, ...props }: ContentProps & { ref?: React.Ref<ContentRef> }) {
    const { open: value, nativeID, onOpenChange } = useRootContext();

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
      if (!value) {
        return null;
      }
    }

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        role='alertdialog'
        nativeID={nativeID}
        aria-labelledby={`${nativeID}_label`}
        aria-describedby={`${nativeID}_desc`}
        aria-modal={true}
        {...props}
      />
    );
  }

Content.displayName = 'ContentNativeAlertDialog';

function Cancel({ ref, asChild, onPress: onPressProp, disabled = false, ...props }: CancelProps & { ref?: React.Ref<CancelRef> }) {
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

Cancel.displayName = 'CloseNativeAlertDialog';

function Action({ ref, asChild, onPress: onPressProp, disabled = false, ...props }: ActionProps & { ref?: React.Ref<ActionRef> }) {
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

Action.displayName = 'ActionNativeAlertDialog';

function Title({ ref, asChild, ...props }: TitleProps & { ref?: React.Ref<TitleRef> }) {
  const { nativeID } = useRootContext();
  const Component = asChild ? Slot.Text : Text;
  return <Component ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />;
}

Title.displayName = 'TitleNativeAlertDialog';

function Description({ ref, asChild, ...props }: DescriptionProps & { ref?: React.Ref<DescriptionRef> }) {
    const { nativeID } = useRootContext();
    const Component = asChild ? Slot.Text : Text;
    return <Component ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
  }

Description.displayName = 'DescriptionNativeAlertDialog';

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
