import { Pressable, View } from '@rn-primitives/core/dist/native';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { ContentProps, RootProps, TriggerProps } from './types';

const CollapsibleContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
  nativeID: string;
} | null>(null);

function Root({
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

  return (
    <CollapsibleContext.Provider
      value={{
        disabled,
        open,
        onOpenChange,
        nativeID,
      }}
    >
      <View {...viewProps} />
    </CollapsibleContext.Provider>
  );
}

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      'Collapsible compound components cannot be rendered outside the Collapsible component'
    );
  }
  return context;
}

function Trigger({ onPress: onPressProp, disabled: disabledProp = false, ...props }: TriggerProps) {
  const { disabled, open, onOpenChange, nativeID } = useCollapsibleContext();

  const onPress = React.useCallback(
    (ev: GestureResponderEvent) => {
      onOpenChange(!open);
      if (typeof onPressProp === 'function') {
        onPressProp(ev);
      }
    },
    [onPressProp, onOpenChange, open]
  );

  const isDisabled = !!(disabledProp || disabled);

  return (
    <Pressable
      nativeID={nativeID}
      aria-disabled={isDisabled}
      role='button'
      onPress={onPress}
      aria-expanded={open}
      disabled={isDisabled}
      {...props}
    />
  );
}

function Content({ forceMount, ...props }: ContentProps) {
  const { nativeID, open } = useCollapsibleContext();

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  return (
    <View
      aria-hidden={!(forceMount || open)}
      aria-labelledby={nativeID}
      role={'region'}
      {...props}
    />
  );
}

export { Content, Root, Trigger };
