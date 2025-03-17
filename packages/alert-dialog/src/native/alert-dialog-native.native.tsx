import { Pressable, Text, View } from '@rn-primitives/core/dist/native';
import { useControllableState } from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import * as React from 'react';
import { BackHandler, type GestureResponderEvent } from 'react-native';
import { RootContext, useRootContext } from '../utils/contexts';
import type {
  ActionProps,
  CancelProps,
  ContentProps,
  DescriptionProps,
  OverlayProps,
  PortalProps,
  RootProps,
  TitleProps,
  TriggerProps,
} from './types';

const RootInternalContext = React.createContext<{ nativeID: string } | null>(null);

function Root({
  open: openProp,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  children,
}: RootProps) {
  const nativeID = React.useId();
  const [open = false, onOpenChange] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChangeProp,
  });
  return (
    <RootInternalContext.Provider value={{ nativeID }}>
      <RootContext.Provider value={{ open, onOpenChange }}>
        <>{children}</>
      </RootContext.Provider>
    </RootInternalContext.Provider>
  );
}

function useRootInternalContext() {
  const context = React.useContext(RootInternalContext);
  if (!context) {
    throw new Error(
      'Alert Dialog Internal compound components cannot be rendered outside the AlertDialog component'
    );
  }
  return context;
}

const Trigger = ({ onPress: onPressProp, disabled, ...props }: TriggerProps) => {
  const { open: value, onOpenChange } = useRootContext();

  const onPress = React.useCallback(
    (ev: GestureResponderEvent) => {
      onOpenChange(!value);
      if (typeof onPressProp === 'function') {
        onPressProp(ev);
      }
    },
    [onOpenChange, onPressProp, value]
  );

  return (
    <Pressable
      aria-disabled={!disabled ? undefined : true}
      role='button'
      onPress={onPress}
      disabled={!disabled ? undefined : true}
      {...props}
    />
  );
};

Trigger.displayName = 'AlertDialogTriggerNative';

function Portal({ forceMount, hostName, children }: PortalProps) {
  const internalValue = useRootInternalContext();
  const value = useRootContext();

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${internalValue.nativeID}_portal`}>
      <RootInternalContext.Provider value={internalValue}>
        <RootContext.Provider value={value}>{children}</RootContext.Provider>
      </RootInternalContext.Provider>
    </RNPPortal>
  );
}

const Overlay = ({
  forceMount,
  onAccessibilityEscape: onAccessibilityEscapeProp,
  ...props
}: OverlayProps) => {
  const { open: value, onOpenChange } = useRootContext();

  const onAccessibilityEscape = React.useCallback(() => {
    if (typeof onAccessibilityEscape === 'function') {
      onAccessibilityEscape();
    }
    onOpenChange(false);
  }, [onAccessibilityEscapeProp, onOpenChange]);

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  return <View aria-modal={true} onAccessibilityEscape={onAccessibilityEscape} {...props} />;
};

Overlay.displayName = 'AlertDialogOverlayNative';

const Content = ({
  forceMount,
  onAccessibilityEscape: onAccessibilityEscapeProp,
  ...props
}: ContentProps) => {
  const { open: value, onOpenChange } = useRootContext();
  const { nativeID } = useRootInternalContext();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onOpenChange(false);
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  const onAccessibilityEscape = React.useCallback(() => {
    if (typeof onAccessibilityEscapeProp === 'function') {
      onAccessibilityEscapeProp();
    }
    onOpenChange(false);
  }, [onAccessibilityEscapeProp, onOpenChange]);

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  return (
    <View
      role='alertdialog'
      nativeID={nativeID}
      aria-labelledby={`${nativeID}_title`}
      aria-describedby={`${nativeID}_description`}
      aria-live='assertive'
      onAccessibilityEscape={onAccessibilityEscape}
      {...props}
    />
  );
};

Content.displayName = 'AlertDialogContentNative';

const Cancel = ({ onPress: onPressProp, disabled, ...props }: CancelProps) => {
  const { onOpenChange } = useRootContext();

  const onPress = React.useCallback(
    (ev: GestureResponderEvent) => {
      onOpenChange(false);
      if (typeof onPressProp === 'function') {
        onPressProp(ev);
      }
    },
    [onOpenChange, onPressProp]
  );

  return (
    <Pressable
      aria-disabled={!disabled ? undefined : true}
      role='button'
      onPress={onPress}
      disabled={!disabled ? undefined : true}
      {...props}
    />
  );
};

Cancel.displayName = 'AlertDialogCloseNative';

const Action = ({ onPress: onPressProp, disabled, ...props }: ActionProps) => {
  const { onOpenChange } = useRootContext();

  const onPress = React.useCallback(
    (ev: GestureResponderEvent) => {
      onOpenChange(false);
      if (typeof onPressProp === 'function') {
        onPressProp(ev);
      }
    },
    [onOpenChange, onPressProp]
  );

  return (
    <Pressable
      aria-disabled={!disabled ? undefined : true}
      role='button'
      onPress={onPress}
      disabled={!disabled ? undefined : true}
      {...props}
    />
  );
};

Action.displayName = 'AlertDialogActionNative';

const Title = (props: TitleProps) => {
  const { nativeID } = useRootInternalContext();
  return <Text role='heading' nativeID={`${nativeID}_title`} {...props} />;
};

Title.displayName = 'AlertDialogTitleNative';

const Description = ({ ...props }: DescriptionProps) => {
  const { nativeID } = useRootInternalContext();
  return <Text nativeID={`${nativeID}_description`} {...props} />;
};

Description.displayName = 'AlertDialogDescriptionNative';

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
