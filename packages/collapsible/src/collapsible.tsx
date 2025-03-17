import { useControllableState } from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type { ContentProps, RootContext, RootProps, TriggerProps } from './types';

const CollapsibleContext = React.createContext<(RootContext & { nativeID: string }) | null>(null);

function Root({
  asChild,
  disabled = false,
  open: openProp,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  ...viewProps
}: RootProps) {
  const nativeID = React.useId();
  const [open = false, onOpenChange] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChangeProp,
  });

  const Component = asChild ? Slot : View;
  return (
    <CollapsibleContext.Provider
      value={{
        disabled,
        open,
        onOpenChange,
        nativeID,
      }}
    >
      <Component {...viewProps} />
    </CollapsibleContext.Provider>
  );
}

Root.displayName = 'RootNativeCollapsible';

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      'Collapsible compound components cannot be rendered outside the Collapsible component'
    );
  }
  return context;
}

function Trigger({
  asChild,
  onPress: onPressProp,
  disabled: disabledProp = false,
  ...props
}: TriggerProps) {
  const { disabled, open, onOpenChange, nativeID } = useCollapsibleContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled || disabledProp) return;
    onOpenChange(!open);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Component
      nativeID={nativeID}
      aria-disabled={(disabled || disabledProp) ?? undefined}
      role='button'
      onPress={onPress}
      accessibilityState={{
        expanded: open,
        disabled: (disabled || disabledProp) ?? undefined,
      }}
      disabled={disabled || disabledProp}
      {...props}
    />
  );
}

Trigger.displayName = 'TriggerNativeCollapsible';

function Content({ asChild, forceMount, ...props }: ContentProps) {
  const { nativeID, open } = useCollapsibleContext();

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot : View;
  return (
    <Component
      aria-hidden={!(forceMount || open)}
      aria-labelledby={nativeID}
      role={'region'}
      {...props}
    />
  );
}

Content.displayName = 'ContentNativeCollapsible';

export { Content, Root, Trigger };
