import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type {
  ContentProps,
  ContentRef,
  ListProps,
  ListRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './types';

interface RootContext extends RootProps {
  nativeID: string;
}

const TabsContext = React.createContext<RootContext | null>(null);

function Root({ ref, asChild,
      value,
      onValueChange,
      orientation: _orientation,
      dir: _dir,
      activationMode: _activationMode,
      ...viewProps
     }: RootProps & { ref?: React.Ref<RootRef> }) {
    const nativeID = React.useId();
    const Component = asChild ? Slot.View : View;
    return (
      <TabsContext.Provider
        value={{
          value,
          onValueChange,
          nativeID,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </TabsContext.Provider>
    );
  }
);

Root.displayName = 'RootNativeTabs';

function useRootContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components cannot be rendered outside the Tabs component');
  }
  return context;
}

function List({ ref, asChild, ...props  }: ListProps & { ref?: React.Ref<ListRef> }) {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='tablist' {...props} />;
});

List.displayName = 'ListNativeTabs';

const TriggerContext = React.createContext<{ value: string } | null>(null);

function Trigger({ ref, asChild, onPress: onPressProp, disabled, value: tabValue, ...props  }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
    const { onValueChange, value: rootValue, nativeID } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onValueChange(tabValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <TriggerContext.Provider value={{ value: tabValue }}>
        <Component
          ref={ref}
          nativeID={`${nativeID}-tab-${tabValue}`}
          aria-disabled={!!disabled}
          aria-selected={rootValue === tabValue}
          role='tab'
          onPress={onPress}
          accessibilityState={{
            selected: rootValue === tabValue,
            disabled: !!disabled,
          }}
          disabled={!!disabled}
          {...props}
        />
      </TriggerContext.Provider>
    );
  }
);

Trigger.displayName = 'TriggerNativeTabs';

function useTriggerContext() {
  const context = React.useContext(TriggerContext);
  if (!context) {
    throw new Error(
      'Tabs.Trigger compound components cannot be rendered outside the Tabs.Trigger component'
    );
  }
  return context;
}

function Content({ ref, asChild, forceMount, value: tabValue, ...props  }: ContentProps & { ref?: React.Ref<ContentRef> }) {
    const { value: rootValue, nativeID } = useRootContext();

    if (!forceMount) {
      if (rootValue !== tabValue) {
        return null;
      }
    }

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        aria-hidden={!(forceMount || rootValue === tabValue)}
        aria-labelledby={`${nativeID}-tab-${tabValue}`}
        role='tabpanel'
        {...props}
      />
    );
  }
);

Content.displayName = 'ContentNativeTabs';

export { Content, List, Root, Trigger, useRootContext, useTriggerContext };
