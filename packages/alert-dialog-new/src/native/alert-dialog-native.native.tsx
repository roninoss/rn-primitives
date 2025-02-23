import { AnimatablePressable, AnimatableText, AnimatableView } from '@rn-primitives/animatable';
import { useAugmentedRef, useControllableState } from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { BackHandler, type GestureResponderEvent } from 'react-native';
import { RootContext, useRootContext } from '../utils/contexts';
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
  RootProps,
  TitleProps,
  TitleRef,
  TriggerProps,
  TriggerRef,
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

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { open: value, onOpenChange } = useRootContext();
    const methods = React.useMemo(() => {
      return {
        trigger: () => {
          onOpenChange(!value);
        },
      };
    }, [onOpenChange, value]);

    const triggerRef = useAugmentedRef({ ref, methods });

    const onPress = React.useCallback(
      (ev: GestureResponderEvent) => {
        onOpenChange(!value);
        if (typeof onPressProp === 'function') {
          onPressProp(ev);
        }
      },
      [onOpenChange, onPressProp, value]
    );

    const Component = asChild ? Slot : AnimatablePressable;
    return (
      <Component
        ref={triggerRef}
        aria-disabled={!!disabled}
        role='button'
        onPress={onPress}
        disabled={!!disabled}
        {...props}
      />
    );
  }
);

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

const Overlay = React.forwardRef<OverlayRef, OverlayProps>(
  ({ asChild, forceMount, onAccessibilityEscape: onAccessibilityEscapeProp, ...props }, ref) => {
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

    const Component = asChild ? Slot : AnimatableView;
    return (
      <Component
        ref={ref}
        aria-modal={true}
        onAccessibilityEscape={onAccessibilityEscape}
        {...props}
      />
    );
  }
);

Overlay.displayName = 'AlertDialogOverlayNative';

const Content = React.forwardRef<ContentRef, ContentProps>(
  ({ asChild, forceMount, onAccessibilityEscape: onAccessibilityEscapeProp, ...props }, ref) => {
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

    const Component = asChild ? Slot : AnimatableView;
    return (
      <Component
        ref={ref}
        role='alertdialog'
        nativeID={nativeID}
        aria-labelledby={`${nativeID}_title`}
        aria-describedby={`${nativeID}_description`}
        aria-live='assertive'
        onAccessibilityEscape={onAccessibilityEscape}
        {...props}
      />
    );
  }
);

Content.displayName = 'AlertDialogContentNative';

const Cancel = React.forwardRef<CancelRef, CancelProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
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

    const Component = asChild ? Slot : AnimatablePressable;
    return (
      <Component
        ref={ref}
        aria-disabled={!!disabled}
        role='button'
        onPress={onPress}
        disabled={!!disabled}
        {...props}
      />
    );
  }
);

Cancel.displayName = 'AlertDialogCloseNative';

const Action = React.forwardRef<ActionRef, ActionProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
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

    const Component = asChild ? Slot : AnimatablePressable;
    return (
      <Component
        ref={ref}
        aria-disabled={!!disabled}
        role='button'
        onPress={onPress}
        disabled={!!disabled}
        {...props}
      />
    );
  }
);

Action.displayName = 'AlertDialogActionNative';

const Title = React.forwardRef<TitleRef, TitleProps>(({ asChild, ...props }, ref) => {
  const { nativeID } = useRootInternalContext();
  const Component = asChild ? Slot : AnimatableText;
  return <Component ref={ref} role='heading' nativeID={`${nativeID}_title`} {...props} />;
});

Title.displayName = 'AlertDialogTitleNative';

const Description = React.forwardRef<DescriptionRef, DescriptionProps>(
  ({ asChild, ...props }, ref) => {
    const { nativeID } = useRootInternalContext();
    const Component = asChild ? Slot : AnimatableText;
    return <Component ref={ref} nativeID={`${nativeID}_description`} {...props} />;
  }
);

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
