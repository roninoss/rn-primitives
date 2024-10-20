import * as Tabs from '@radix-ui/react-tabs';
import * as Slot from '@rn-primitives/slot';
import type { ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import type { TabsContentProps, TabsListProps, TabsRootProps, TabsTriggerProps } from './types';

const TabsContext = React.createContext<TabsRootProps | null>(null);
const Root = React.forwardRef<ViewRef, TabsRootProps>(
  ({ asChild, value, onValueChange, orientation, dir, activationMode, ...viewProps }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <TabsContext.Provider
        value={{
          value,
          onValueChange,
        }}
      >
        <Tabs.Root
          value={value}
          onValueChange={onValueChange}
          orientation={orientation}
          dir={dir}
          activationMode={activationMode}
          asChild
        >
          <Component ref={ref} {...viewProps} />
        </Tabs.Root>
      </TabsContext.Provider>
    );
  }
);

Root.displayName = 'RootWebTabs';

function useRootContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components cannot be rendered outside the Tabs component');
  }
  return context;
}

const List = React.forwardRef<ViewRef, TabsListProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Tabs.List asChild>
      <Component ref={ref} {...props} />
    </Tabs.List>
  );
});

List.displayName = 'ListWebTabs';

const TriggerContext = React.createContext<{ value: string } | null>(null);
const Trigger = React.forwardRef<React.ElementRef<typeof Pressable>, TabsTriggerProps>(
  ({ asChild, value: tabValue, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <TriggerContext.Provider value={{ value: tabValue }}>
        <Tabs.Trigger value={tabValue} asChild>
          <Component ref={ref} {...props} />
        </Tabs.Trigger>
      </TriggerContext.Provider>
    );
  }
);

Trigger.displayName = 'TriggerWebTabs';

function useTriggerContext() {
  const context = React.useContext(TriggerContext);
  if (!context) {
    throw new Error(
      'Tabs.Trigger compound components cannot be rendered outside the Tabs.Trigger component'
    );
  }
  return context;
}

const Content = React.forwardRef<ViewRef, TabsContentProps>(
  ({ asChild, forceMount, value, tabIndex = -1, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Tabs.Content value={value} asChild>
        <Component ref={ref} {...props} tabIndex={tabIndex} />
      </Tabs.Content>
    );
  }
);

Content.displayName = 'ContentWebTabs';

export { Content, List, Root, Trigger, useRootContext, useTriggerContext };
