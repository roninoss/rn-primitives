import { Slot } from '@rn-primitives/slot';
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

const Root = (
  {
    ref,
    asChild,
    type = 'foreground',
    open,
    onOpenChange,
    ...viewProps
  }: RootProps & {
    ref: React.RefObject<RootRef>;
  }
) => {
  const nativeID = React.useId();

  if (!open) {
    return null;
  }

  const Component = asChild ? Slot : View;
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
};

Root.displayName = 'RootToast';

function useToastContext() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('Toast compound components cannot be rendered outside the Toast component');
  }
  return context;
}

const Close = (
  {
    ref,
    asChild,
    onPress: onPressProp,
    disabled = false,
    ...props
  }: CloseProps & {
    ref: React.RefObject<CloseRef>;
  }
) => {
  const { onOpenChange } = useToastContext();

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

Close.displayName = 'CloseToast';

const Action = (
  {
    ref,
    asChild,
    onPress: onPressProp,
    disabled = false,
    ...props
  }: ActionProps & {
    ref: React.RefObject<ActionRef>;
  }
) => {
  const { onOpenChange } = useToastContext();

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

Action.displayName = 'ActionToast';

const Title = (
  {
    ref,
    asChild,
    ...props
  }: TitleProps & {
    ref: React.RefObject<TitleRef>;
  }
) => {
  const { nativeID } = useToastContext();

  const Component = asChild ? Slot : Text;
  return <Component ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />;
};

Title.displayName = 'TitleToast';

const Description = (
  {
    ref,
    asChild,
    ...props
  }: DescriptionProps & {
    ref: React.RefObject<DescriptionRef>;
  }
) => {
  const { nativeID } = useToastContext();

  const Component = asChild ? Slot : Text;
  return <Component ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
};

Description.displayName = 'DescriptionToast';

export { Action, Close, Description, Root, Title };
