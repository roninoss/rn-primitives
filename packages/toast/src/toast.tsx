import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import type {
  ActionProps,
  ActionRef,
  CloseProps,
  CloseRef,
  DescriptionProps,
  DescriptionRef,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
} from './types';

interface RootContext extends RootProps {
  nativeID: string;
}
const ToastContext = React.createContext<RootContext | null>(null);

function Root({ ref, asChild, type = 'foreground', open, onOpenChange, ...viewProps  }: RootProps & { ref?: React.Ref<RootRef> }) {
    const nativeID = React.useId();

    if (!open) {
      return null;
    }

    const Component = asChild ? Slot.View : View;
    return (
      <ToastContext.Provider
        value={{
          open,
          onOpenChange,
          type,
          nativeID,
        }}
      >
        <Component
          ref={ref}
          role='status'
          aria-live={type === 'foreground' ? 'assertive' : 'polite'}
          {...viewProps}
        />
      </ToastContext.Provider>
    );
  }

Root.displayName = 'RootToast';

function useToastContext() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('Toast compound components cannot be rendered outside the Toast component');
  }
  return context;
}

function Close({ ref, asChild, onPress: onPressProp, disabled = false, ...props  }: CloseProps & { ref?: React.Ref<CloseRef> }) {
    const { onOpenChange } = useToastContext();

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

Close.displayName = 'CloseToast';

function Action({ ref, asChild, onPress: onPressProp, disabled = false, ...props  }: ActionProps & { ref?: React.Ref<ActionRef> }) {
    const { onOpenChange } = useToastContext();

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

Action.displayName = 'ActionToast';

function Title({ ref, asChild, ...props  }: TitleProps & { ref?: React.Ref<TitleRef> }) {
  const { nativeID } = useToastContext();

  const Component = asChild ? Slot.Text : Text;
  return <Component ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />;
});

Title.displayName = 'TitleToast';

function Description({ ref, asChild, ...props  }: DescriptionProps & { ref?: React.Ref<DescriptionRef> }) {
    const { nativeID } = useToastContext();

    const Component = asChild ? Slot.Text : Text;
    return <Component ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
  }

Description.displayName = 'DescriptionToast';

export { Action, Close, Description, Root, Title };
