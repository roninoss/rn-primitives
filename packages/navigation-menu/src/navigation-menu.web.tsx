import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useComposedRefs, useIsomorphicLayoutEffect } from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
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
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  value,
  onValueChange,
  delayDuration,
  skipDelayDuration,
  dir,
  orientation,
  ref,
  ...viewProps
}: RootComponentProps) => {
  const Component = asChild ? Slot : View;
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
};

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
type ListComponentProps = ListProps & React.RefAttributes<ListRef>;

const List = ({ asChild, ref, ...viewProps }: ListComponentProps) => {
  const listRef = React.useRef<ListRef>(null);
  const composedRef = useComposedRefs(ref, listRef);
  const { orientation } = useRootContext();

  useIsomorphicLayoutEffect(() => {
    if (listRef.current) {
      const augRef = listRef.current as unknown as HTMLDivElement;
      augRef.dataset.orientation = orientation;
    }
  }, [orientation]);

  const Component = asChild ? Slot : View;
  return (
    <NavigationMenu.List asChild>
      <Component ref={composedRef} {...viewProps} />
    </NavigationMenu.List>
  );
};

List.displayName = 'ListWebNavigationMenu';

const ItemContext = React.createContext<ItemProps | null>(null);
type ItemComponentProps = ItemProps & React.RefAttributes<ItemRef>;

const Item = ({ asChild, value, ref, ...props }: ItemComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <ItemContext.Provider value={{ value }}>
      <NavigationMenu.Item value={value} asChild>
        <Component ref={ref} {...props} />
      </NavigationMenu.Item>
    </ItemContext.Provider>
  );
};

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
type TriggerComponentProps = TriggerProps & React.RefAttributes<TriggerRef>;

const Trigger = ({
  asChild,
  onPress: onPressProp,
  disabled = false,
  onKeyDown: onKeyDownProp,
  ref,
  ...props
}: TriggerComponentProps) => {
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

  const Component = asChild ? Slot : Pressable;
  return (
    <NavigationMenu.Trigger disabled={disabled ?? undefined} asChild>
      <Component ref={ref} onKeyDown={onKeyDown} onPress={onPress} {...props} />
    </NavigationMenu.Trigger>
  );
};

Trigger.displayName = 'TriggerWebNavigationMenu';

function Portal({ children }: PortalProps) {
  return <>{children}</>;
}
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({
  asChild = false,
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
  ref,
  ...props
}: ContentComponentProps) => {
  const Component = asChild ? Slot : View;
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
};

Content.displayName = 'ContentWebNavigationMenu';
type LinkComponentProps = LinkProps & React.RefAttributes<LinkRef>;

const Link = ({
  asChild,
  active,
  onPress: onPressProp,
  onKeyDown: onKeyDownProp,
  ref,
  ...props
}: LinkComponentProps) => {
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

  const Component = asChild ? Slot : Pressable;
  return (
    <NavigationMenu.Link active={active} asChild>
      <Component ref={ref} role='link' onKeyDown={onKeyDown} onPress={onPress} {...props} />
    </NavigationMenu.Link>
  );
};

Link.displayName = 'LinkWebNavigationMenu';
type ViewportComponentProps = ViewportProps & React.RefAttributes<ViewportRef>;

const Viewport = ({ ref, ...props }: ViewportComponentProps) => {
  return (
    <Slot ref={ref} {...props}>
      <NavigationMenu.Viewport />
    </Slot>
  );
};

Viewport.displayName = 'ViewportWebNavigationMenu';
type IndicatorComponentProps = IndicatorProps & React.RefAttributes<IndicatorRef>;

const Indicator = ({ asChild, ref, ...props }: IndicatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <NavigationMenu.Indicator asChild>
      <Component ref={ref} {...props} />
    </NavigationMenu.Indicator>
  );
};

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
