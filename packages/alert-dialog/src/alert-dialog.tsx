import { useControllableState } from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import { Slot } from '@rn-primitives/slot';
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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  open: openProp,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  ref,
  ...viewProps
}: RootComponentProps) => {
  const nativeID = React.useId();
  const [open = false, onOpenChange] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChangeProp,
  });
  const Component = asChild ? Slot : View;
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
};

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
type TriggerComponentProps = TriggerProps & React.RefAttributes<TriggerRef>;

const Trigger = ({
  asChild,
  onPress: onPressProp,
  disabled = false,
  ref,
  ...props
}: TriggerComponentProps) => {
  const { open: value, onOpenChange } = useRootContext();

  function onPress(ev: GestureResponderEvent) {
    onOpenChange(!value);
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
};

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
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({ asChild, forceMount, ref, ...props }: OverlayComponentProps) => {
  const { open: value } = useRootContext();

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  const Component = asChild ? Slot : View;
  return <Component ref={ref} {...props} />;
};

Overlay.displayName = 'OverlayNativeAlertDialog';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({ asChild, forceMount, ref, ...props }: ContentComponentProps) => {
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

  const Component = asChild ? Slot : View;
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
};

Content.displayName = 'ContentNativeAlertDialog';
type CancelComponentProps = CancelProps & React.RefAttributes<CancelRef>;

const Cancel = ({
  asChild,
  onPress: onPressProp,
  disabled = false,
  ref,
  ...props
}: CancelComponentProps) => {
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
};

Cancel.displayName = 'CloseNativeAlertDialog';
type ActionComponentProps = ActionProps & React.RefAttributes<ActionRef>;

const Action = ({
  asChild,
  onPress: onPressProp,
  disabled = false,
  ref,
  ...props
}: ActionComponentProps) => {
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
};

Action.displayName = 'ActionNativeAlertDialog';
type TitleComponentProps = TitleProps & React.RefAttributes<TitleRef>;

const Title = ({ asChild, ref, ...props }: TitleComponentProps) => {
  const { nativeID } = useRootContext();
  const Component = asChild ? Slot : Text;
  return <Component ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />;
};

Title.displayName = 'TitleNativeAlertDialog';
type DescriptionComponentProps = DescriptionProps & React.RefAttributes<DescriptionRef>;

const Description = ({ asChild, ref, ...props }: DescriptionComponentProps) => {
  const { nativeID } = useRootContext();
  const Component = asChild ? Slot : Text;
  return <Component ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
};

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
