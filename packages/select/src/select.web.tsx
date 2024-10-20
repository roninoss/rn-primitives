import * as Select from '@radix-ui/react-select';
import {
  useAugmentedRef,
  useControllableState,
  useIsomorphicLayoutEffect,
} from '@rn-primitives/hooks';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
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

/**
 * @web Parameter of `onValueChange` has the value of `value` for the `value` and the `label` of the selected Option
 * @ex When an Option with a label of Green Apple, the parameter passed to `onValueChange` is { value: 'green-apple', label: 'green-apple' }
 */
const Root = React.forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      value: valueProp,
      defaultValue,
      onValueChange: onValueChangeProp,
      onOpenChange: onOpenChangeProp,
      ...viewProps
    },
    ref
  ) => {
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

    const Component = asChild ? Slot.View : View;
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
  }
);

Root.displayName = 'RootWebSelect';

function useRootContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components cannot be rendered outside the Select component');
  }
  return context;
}

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(
  ({ asChild, role: _role, disabled, ...props }, ref) => {
    const { open, onOpenChange } = useRootContext();
    const augmentedRef = useAugmentedRef({
      ref,
      methods: {
        open() {
          onOpenChange(true);
        },
        close() {
          onOpenChange(false);
        },
      },
    });

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.dataset.state = open ? 'open' : 'closed';
        augRef.type = 'button';
      }
    }, [open]);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Select.Trigger disabled={disabled ?? undefined} asChild>
        <Component ref={augmentedRef} role='button' disabled={disabled} {...props} />
      </Select.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebSelect';

const Value = React.forwardRef<ValueRef, ValueProps>(
  ({ asChild, placeholder, children, ...props }, ref) => {
    return (
      <Slot.Text ref={ref} {...props}>
        <Select.Value placeholder={placeholder}>{children}</Select.Value>
      </Slot.Text>
    );
  }
);

Value.displayName = 'ValueWebSelect';

function Portal({ container, children }: PortalProps) {
  return <Select.Portal children={children} container={container} />;
}

const Overlay = React.forwardRef<OverlayRef, OverlayProps>(
  ({ asChild, forceMount, children, ...props }, ref) => {
    const { open } = useRootContext();

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        {open && <Component ref={ref} {...props} />}
        {children}
      </>
    );
  }
);

Overlay.displayName = 'OverlayWebSelect';

const Content = React.forwardRef<ContentRef, ContentProps>(
  (
    {
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
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
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
  }
);

Content.displayName = 'ContentWebSelect';

const ItemContext = React.createContext<{
  itemValue: string;
  label: string;
} | null>(null);

const Item = React.forwardRef<ItemRef, ItemProps>(
  ({ asChild, closeOnPress = true, label, value, children, ...props }, ref) => {
    return (
      <ItemContext.Provider value={{ itemValue: value, label: label }}>
        <Slot.Pressable ref={ref} {...props}>
          <Select.Item textValue={label} value={value} disabled={props.disabled ?? undefined}>
            <>{children}</>
          </Select.Item>
        </Slot.Pressable>
      </ItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemWebSelect';

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error('Item compound components cannot be rendered outside of an Item component');
  }
  return context;
}

const ItemText = React.forwardRef<ItemTextRef, Omit<ItemTextProps, 'children'>>(
  ({ asChild, ...props }, ref) => {
    const { label } = useItemContext();

    const Component = asChild ? Slot.Text : Text;
    return (
      <Select.ItemText asChild>
        <Component ref={ref} {...props}>
          {label}
        </Component>
      </Select.ItemText>
    );
  }
);

ItemText.displayName = 'ItemTextWebSelect';

const ItemIndicator = React.forwardRef<ItemIndicatorRef, ItemIndicatorProps>(
  ({ asChild, forceMount: _forceMount, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Select.ItemIndicator asChild>
        <Component ref={ref} {...props} />
      </Select.ItemIndicator>
    );
  }
);

ItemIndicator.displayName = 'ItemIndicatorWebSelect';

const Group = React.forwardRef<GroupRef, GroupProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Select.Group asChild>
      <Component ref={ref} {...props} />
    </Select.Group>
  );
});

Group.displayName = 'GroupWebSelect';

const Label = React.forwardRef<LabelRef, LabelProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Text;
  return (
    <Select.Label asChild>
      <Component ref={ref} {...props} />
    </Select.Label>
  );
});

Label.displayName = 'LabelWebSelect';

const Separator = React.forwardRef<SeparatorRef, SeparatorProps>(
  ({ asChild, decorative, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Select.Separator asChild>
        <Component ref={ref} {...props} />
      </Select.Separator>
    );
  }
);

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
