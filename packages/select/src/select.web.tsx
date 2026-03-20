import * as Select from '@radix-ui/react-select';
import {
  useComposedRefs,
  useControllableState,
  useEffectEvent,
  useIsomorphicLayoutEffect,
} from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { type GestureResponderEvent, Pressable, Text, View } from 'react-native';
import type {
  ContentProps,
  ContentRef,
  GroupProps,
  GroupRef,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemProps,
  ItemRef,
  ItemTextProps,
  ItemTextRef,
  LabelProps,
  LabelRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
  ScrollDownButtonProps,
  ScrollUpButtonProps,
  SeparatorProps,
  SeparatorRef,
  SharedRootContext,
  TriggerProps,
  TriggerRef,
  ValueProps,
  ValueRef,
  ViewportProps,
} from './types';

const SelectContext = React.createContext<
  | (SharedRootContext & {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  })
  | null
>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  value: valueProp,
  defaultValue,
  onValueChange: onValueChangeProp,
  onOpenChange: onOpenChangeProp,
  ref,
  ...viewProps
}: RootComponentProps) => {
  const [value, onValueChange] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChangeProp,
  });
  const [open, setOpen] = React.useState(false);

  function onOpenChange(value: boolean) {
    setOpen(value);
    onOpenChangeProp?.(value);
  }

  function onStrValueChange(val: string) {
    onValueChange({ value: val, label: val });
  }

  const Component = asChild ? Slot : View;
  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange,
        open,
        onOpenChange,
      }}
    >
      <Select.Root
        value={value?.value}
        defaultValue={defaultValue?.value}
        onValueChange={onStrValueChange}
        open={open}
        onOpenChange={onOpenChange}
      >
        <Component ref={ref} {...viewProps} />
      </Select.Root>
    </SelectContext.Provider>
  );
};

Root.displayName = 'RootWebSelect';

function useRootContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components cannot be rendered outside the Select component');
  }
  return context;
}
type TriggerComponentProps = TriggerProps & React.RefAttributes<TriggerRef>;

const Trigger = ({
  asChild,
  role: _role,
  disabled,
  ref,
  onTouchStart: onTouchStartProp,
  ...props
}: TriggerComponentProps) => {
  const { open, onOpenChange } = useRootContext();
  const triggerRef = React.useRef<TriggerRef>(null);

  const openTriggerEvent = useEffectEvent(() => {
    onOpenChange(true);
  });
  const closeTriggerEvent = useEffectEvent(() => {
    onOpenChange(false);
  });

  const composedRef = useComposedRefs(
    triggerRef,
    ref,
    React.useCallback((node: TriggerRef | null) => {
      if (!node) return;
      node.open = () => openTriggerEvent();
      node.close = () => closeTriggerEvent();
    }, [])
  );

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const augRef = triggerRef.current as unknown as HTMLButtonElement;
      augRef.dataset.state = open ? 'open' : 'closed';
      augRef.type = 'button';
    }
  }, [open]);

  function onTouchStart(ev: GestureResponderEvent) {
    onTouchStartProp?.(ev);
    if (!ev.defaultPrevented) {
      onOpenChange(true);
    }
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Select.Trigger disabled={disabled ?? undefined} asChild>
      <Component
        ref={composedRef}
        role='button'
        disabled={disabled}
        onTouchStart={onTouchStart}
        {...props}
      />
    </Select.Trigger>
  );
};

Trigger.displayName = 'TriggerWebSelect';
type ValueComponentProps = ValueProps & React.RefAttributes<ValueRef>;

const Value = ({ asChild, placeholder, children, ref, ...props }: ValueComponentProps) => {
  return (
    <Slot ref={ref} {...props}>
      <Select.Value placeholder={placeholder}>{children}</Select.Value>
    </Slot>
  );
};

Value.displayName = 'ValueWebSelect';

function Portal({ container, children }: PortalProps) {
  return <Select.Portal children={children} container={container} />;
}
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({ asChild, forceMount, children, ref, ...props }: OverlayComponentProps) => {
  const { open } = useRootContext();

  const Component = asChild ? Slot : Pressable;
  return (
    <>
      {open && <Component ref={ref} {...props} />}
      {children as React.ReactNode}
    </>
  );
};

Overlay.displayName = 'OverlayWebSelect';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({
  asChild = false,
  forceMount: _forceMount,
  align = 'start',
  side = 'bottom',
  position = 'popper',
  sideOffset = 0,
  alignOffset = 0,
  avoidCollisions = true,
  disablePositioningStyle: _disablePositioningStyle,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onInteractOutside: _onInteractOutside,
  onPointerDownOutside,
  ref,
  ...props
}: ContentComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Select.Content
      onCloseAutoFocus={onCloseAutoFocus}
      onEscapeKeyDown={onEscapeKeyDown}
      onPointerDownOutside={onPointerDownOutside}
      align={align}
      side={side}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      avoidCollisions={avoidCollisions}
      position={position}
    >
      <Component ref={ref} {...props} />
    </Select.Content>
  );
};

Content.displayName = 'ContentWebSelect';

const ItemContext = React.createContext<{
  itemValue: string;
  label: string;
} | null>(null);
type ItemComponentProps = ItemProps & React.RefAttributes<ItemRef>;

const Item = ({
  asChild,
  closeOnPress = true,
  label,
  value,
  children,
  ref,
  ...props
}: ItemComponentProps) => {
  return (
    <ItemContext.Provider value={{ itemValue: value, label: label }}>
      <Slot ref={ref} {...props}>
        <Select.Item textValue={label} value={value} disabled={props.disabled ?? undefined}>
          <>{children as React.ReactNode}</>
        </Select.Item>
      </Slot>
    </ItemContext.Provider>
  );
};

Item.displayName = 'ItemWebSelect';

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error('Item compound components cannot be rendered outside of an Item component');
  }
  return context;
}
type ItemTextComponentProps = Omit<ItemTextProps, 'children'> & React.RefAttributes<ItemTextRef>;

const ItemText = ({ asChild, ref, ...props }: ItemTextComponentProps) => {
  const { label } = useItemContext();

  const Component = asChild ? Slot : Text;
  return (
    <Select.ItemText asChild>
      <Component ref={ref} {...props}>
        {label}
      </Component>
    </Select.ItemText>
  );
};

ItemText.displayName = 'ItemTextWebSelect';
type ItemIndicatorComponentProps = ItemIndicatorProps & React.RefAttributes<ItemIndicatorRef>;

const ItemIndicator = ({
  asChild,
  forceMount: _forceMount,
  ref,
  ...props
}: ItemIndicatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Select.ItemIndicator asChild>
      <Component ref={ref} {...props} />
    </Select.ItemIndicator>
  );
};

ItemIndicator.displayName = 'ItemIndicatorWebSelect';
type GroupComponentProps = GroupProps & React.RefAttributes<GroupRef>;

const Group = ({ asChild, ref, ...props }: GroupComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Select.Group asChild>
      <Component ref={ref} {...props} />
    </Select.Group>
  );
};

Group.displayName = 'GroupWebSelect';
type LabelComponentProps = LabelProps & React.RefAttributes<LabelRef>;

const Label = ({ asChild, ref, ...props }: LabelComponentProps) => {
  const Component = asChild ? Slot : Text;
  return (
    <Select.Label asChild>
      <Component ref={ref} {...props} />
    </Select.Label>
  );
};

Label.displayName = 'LabelWebSelect';
type SeparatorComponentProps = SeparatorProps & React.RefAttributes<SeparatorRef>;

const Separator = ({ asChild, decorative, ref, ...props }: SeparatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <Select.Separator asChild>
      <Component ref={ref} {...props} />
    </Select.Separator>
  );
};

Separator.displayName = 'SeparatorWebSelect';

const ScrollUpButton = (props: ScrollUpButtonProps) => {
  return <Select.ScrollUpButton {...props} />;
};

const ScrollDownButton = (props: ScrollDownButtonProps) => {
  return <Select.ScrollDownButton {...props} />;
};

const Viewport = (props: ViewportProps) => {
  return <Select.Viewport {...props} />;
};

export {
  Content,
  Group,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Overlay,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  useItemContext,
  useRootContext,
  Value,
  Viewport,
};
