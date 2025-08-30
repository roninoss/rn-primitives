import * as Tabs from '@radix-ui/react-tabs';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View } from 'react-native';
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

const TabsContext = React.createContext<RootProps | null>(null);
function Root({ ref, asChild, value, onValueChange, orientation, dir, activationMode, ...viewProps  }: RootProps & { ref?: React.Ref<RootRef> }) {
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

function List({ ref, asChild, ...props  }: ListProps & { ref?: React.Ref<ListRef> }) {
  const Component = asChild ? Slot.View : View;
  return (
    <Tabs.List asChild>
      <Component ref={ref} {...props} />
    </Tabs.List>
  );
});

List.displayName = 'ListWebTabs';

const TriggerContext = React.createContext<{ value: string } | null>(null);
function Trigger({ ref, asChild, value: tabValue, ...props  }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
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

function Content({ ref, asChild, forceMount, value, tabIndex = -1, ...props  }: ContentProps & { ref?: React.Ref<ContentRef> }) {
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
