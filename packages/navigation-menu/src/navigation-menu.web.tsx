import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useAugmentedRef, useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import * as Slot from '@rn-primitives/slot';
import { EmptyGestureResponderEvent } from '@rn-primitives/utils';
import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import type {
  ContentProps,
  ContentRef,
  IndicatorProps,
  IndicatorRef,
  ItemProps,
  ItemRef,
  LinkProps,
  LinkRef,
  ListProps,
  ListRef,
  PortalProps,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
  ViewportProps,
  ViewportRef,
} from './types';

const NavigationMenuContext = React.createContext<RootProps | null>(null);

function Root({ ref, asChild,
      value,
      onValueChange,
      delayDuration,
      skipDelayDuration,
      dir,
      orientation,
      ...viewProps
     }: RootProps & { ref?: React.Ref<RootRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <NavigationMenuContext.Provider value={{ value, onValueChange, orientation }}>
        <NavigationMenu.Root
          value={value}
          onValueChange={onValueChange}
          delayDuration={delayDuration}
          skipDelayDuration={skipDelayDuration}
          dir={dir}
          orientation={orientation}
        >
          <Component ref={ref} {...viewProps} />
        </NavigationMenu.Root>
      </NavigationMenuContext.Provider>
    );
  }

Root.displayName = 'RootWebNavigationMenu';

function useRootContext() {
  const context = React.useContext(NavigationMenuContext);
  if (!context) {
    throw new Error(
      'NavigationMenu compound components cannot be rendered outside the NavigationMenu component'
    );
  }
  return context;
}

function List({ ref, asChild, ...viewProps  }: ListProps & { ref?: React.Ref<ListRef> }) {
  const augmentedRef = useAugmentedRef({ ref });
  const { orientation } = useRootContext();

  useIsomorphicLayoutEffect(() => {
    if (augmentedRef.current) {
      const augRef = augmentedRef.current as unknown as HTMLDivElement;
      augRef.dataset.orientation = orientation;
    }
  }, [orientation]);

  const Component = asChild ? Slot.View : View;
  return (
    <NavigationMenu.List asChild>
      <Component ref={ref} {...viewProps} />
    </NavigationMenu.List>
  );
}

List.displayName = 'ListWebNavigationMenu';

const ItemContext = React.createContext<ItemProps | null>(null);

function Item({ ref, asChild, value, ...props  }: ItemProps & { ref?: React.Ref<ItemRef> }) {
  const Component = asChild ? Slot.View : View;
  return (
    <ItemContext.Provider value={{ value }}>
      <NavigationMenu.Item value={value} asChild>
        <Component ref={ref} {...props} />
      </NavigationMenu.Item>
    </ItemContext.Provider>
  );
}

Item.displayName = 'ItemWebNavigationMenu';

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error(
      'NavigationMenu compound components cannot be rendered outside the NavigationMenu component'
    );
  }
  return context;
}

function Trigger({ ref, asChild, onPress: onPressProp, disabled = false, onKeyDown: onKeyDownProp, ...props  }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
    const { value: rootValue, onValueChange } = useRootContext();
    const { value } = useItemContext();
    function onKeyDown(ev: React.KeyboardEvent) {
      onKeyDownProp?.(ev);
      if (ev.key === ' ') {
        onPressProp?.(EmptyGestureResponderEvent);
        onValueChange(value === rootValue ? '' : value);
      }
    }

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onValueChange(value === rootValue ? '' : value);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <NavigationMenu.Trigger disabled={disabled ?? undefined} asChild>
        <Component
          ref={ref}
          // @ts-expect-error web only
          onKeyDown={onKeyDown}
          onPress={onPress}
          {...props}
        />
      </NavigationMenu.Trigger>
    );
  }

Trigger.displayName = 'TriggerWebNavigationMenu';

function Portal({ children }: PortalProps) {
  return <>{children}</>;
}

function Content({ ref, asChild = false,
      forceMount,
      align: _align,
      side: _side,
      sideOffset: _sideOffset,
      alignOffset: _alignOffset,
      avoidCollisions: _avoidCollisions,
      onLayout: onLayoutProp,
      insets: _insets,
      disablePositioningStyle: _disablePositioningStyle,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...props
     }: ContentProps & { ref?: React.Ref<ContentRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <NavigationMenu.Content
        forceMount={forceMount}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        onFocusOutside={onFocusOutside}
        onInteractOutside={onInteractOutside}
      >
        <Component ref={ref} {...props} />
      </NavigationMenu.Content>
    );
  }

Content.displayName = 'ContentWebNavigationMenu';

function Link({ ref, asChild, active, onPress: onPressProp, onKeyDown: onKeyDownProp, ...props  }: LinkProps & { ref?: React.Ref<LinkRef> }) {
    const { onValueChange } = useRootContext();
    function onKeyDown(ev: React.KeyboardEvent) {
      onKeyDownProp?.(ev);
      if (ev.key === 'Enter' || ev.key === ' ') {
        onPressProp?.(EmptyGestureResponderEvent);
        onValueChange('');
      }
    }

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onValueChange('');
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <NavigationMenu.Link active={active} asChild>
        <Component
          ref={ref}
          role='link'
          // @ts-expect-error web only
          onKeyDown={onKeyDown}
          onPress={onPress}
          {...props}
        />
      </NavigationMenu.Link>
    );
  }

Link.displayName = 'LinkWebNavigationMenu';

function Viewport({ ref, ...props }: ViewportProps & { ref?: React.Ref<ViewportRef> }) {
  return (
    <Slot.View ref={ref} {...props}>
      <NavigationMenu.Viewport />
    </Slot.View>
  );
}

Viewport.displayName = 'ViewportWebNavigationMenu';

function Indicator({ ref, asChild, ...props  }: IndicatorProps & { ref?: React.Ref<IndicatorRef> }) {
  const Component = asChild ? Slot.View : View;
  return (
    <NavigationMenu.Indicator asChild>
      <Component ref={ref} {...props} />
    </NavigationMenu.Indicator>
  );
}

Indicator.displayName = 'IndicatorWebNavigationMenu';

export {
  Content,
  Indicator,
  Item,
  Link,
  List,
  Portal,
  Root,
  Trigger,
  useItemContext,
  useRootContext,
  Viewport,
};
