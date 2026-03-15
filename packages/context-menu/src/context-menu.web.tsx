import * as ContextMenu from '@radix-ui/react-context-menu';
import {
  useComposedRefs,
  useControllableState,
  useIsomorphicLayoutEffect,
} from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import { EmptyGestureResponderEvent } from '@rn-primitives/utils';
import * as React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import type {
  CheckboxItemProps,
  CheckboxItemRef,
  ContentProps,
  ContentRef,
  GroupProps,
  GroupRef,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemProps,
  ItemRef,
  LabelProps,
  LabelRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RadioGroupProps,
  RadioGroupRef,
  RadioItemProps,
  RadioItemRef,
  RootProps,
  RootRef,
  SeparatorProps,
  SeparatorRef,
  SubContentProps,
  SubContentRef,
  SubProps,
  SubRef,
  SubTriggerProps,
  SubTriggerRef,
  TriggerProps,
  TriggerRef,
} from './types';

const ContextMenuContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  onOpenChange: onOpenChangeProp,
  ref,
  ...viewProps
}: RootComponentProps) => {
  const [open, setOpen] = React.useState(false);

  function onOpenChange(value: boolean) {
    setOpen(value);
    onOpenChangeProp?.(value);
  }

  const Component = asChild ? Slot : View;
  return (
    <ContextMenuContext.Provider value={{ open, onOpenChange }}>
      <ContextMenu.Root onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </ContextMenu.Root>
    </ContextMenuContext.Provider>
  );
};

Root.displayName = 'RootWebContextMenu';

function useRootContext() {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}
type TriggerComponentProps = TriggerProps & React.RefAttributes<TriggerRef>;

const Trigger = ({ asChild, disabled = false, ref, ...props }: TriggerComponentProps) => {
  const { open } = useRootContext();
  const triggerRef = React.useRef<TriggerRef>(null);
  const composedRef = useComposedRefs(triggerRef);

  React.useImperativeHandle(
    ref,
    () =>
      ({
        ...(triggerRef.current ?? {}),
        open() {
          console.warn('Warning: `open()` is only for Native platforms');
        },
        close() {
          console.warn('Warning: `close()` is only for Native platforms');
        },
      } as TriggerRef),
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const augRef = triggerRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = open ? 'open' : 'closed';
    }
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const augRef = triggerRef.current as unknown as HTMLDivElement;
      if (disabled) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [disabled]);

  const Component = asChild ? Slot : Pressable;
  return (
    <ContextMenu.Trigger disabled={disabled ?? undefined} asChild>
      <Component ref={composedRef} disabled={disabled} {...props} />
    </ContextMenu.Trigger>
  );
};

Trigger.displayName = 'TriggerWebContextMenu';

function Portal({ forceMount, container, children }: PortalProps) {
  return <ContextMenu.Portal forceMount={forceMount} container={container} children={children} />;
}
type OverlayComponentProps = OverlayProps & React.RefAttributes<OverlayRef>;

const Overlay = ({ asChild, ref, ...props }: OverlayComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return <Component ref={ref} {...props} />;
};

Overlay.displayName = 'OverlayWebContextMenu';

const ContextMenuContentContext = React.createContext<{
  close: () => void;
} | null>(null);
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({
  asChild = false,
  forceMount,
  align: _align,
  side: _side,
  sideOffset: _sideOffset,
  alignOffset = 0,
  avoidCollisions = true,
  insets,
  loop = true,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onPointerDownOutside,
  onFocusOutside,
  onInteractOutside,
  collisionBoundary,
  sticky,
  hideWhenDetached,
  ref,
  ...props
}: ContentComponentProps) => {
  const itemRef = React.useRef<HTMLDivElement>(null);

  function close() {
    itemRef.current?.click();
  }

  const Component = asChild ? Slot : View;
  return (
    <ContextMenuContentContext.Provider value={{ close }}>
      <ContextMenu.Content
        forceMount={forceMount}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={insets}
        loop={loop}
        onCloseAutoFocus={onCloseAutoFocus}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        onFocusOutside={onFocusOutside}
        onInteractOutside={onInteractOutside}
        collisionBoundary={collisionBoundary}
        sticky={sticky}
        hideWhenDetached={hideWhenDetached}
      >
        <Component ref={ref} {...props} />
        <ContextMenu.Item
          ref={itemRef}
          aria-hidden
          style={{ position: 'fixed', top: 0, left: 0, zIndex: -999999999 }}
          aria-disabled
          tabIndex={-1}
          hidden
        />
      </ContextMenu.Content>
    </ContextMenuContentContext.Provider>
  );
};

Content.displayName = 'ContentWebContextMenu';

function useContextMenuContentContext() {
  const context = React.useContext(ContextMenuContentContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}
type ItemComponentProps = ItemProps & React.RefAttributes<ItemRef>;

const Item = ({
  asChild,
  textValue,
  closeOnPress = true,
  onPress: onPressProp,
  ref,
  ...props
}: ItemComponentProps) => {
  const { close } = useContextMenuContentContext();

  function onKeyDown(ev: React.KeyboardEvent) {
    if (ev.key === 'Enter' || ev.key === ' ') {
      onPressProp?.(EmptyGestureResponderEvent);
      if (closeOnPress) {
        close();
      }
    }
  }

  function onPress(ev: GestureResponderEvent) {
    onPressProp?.(ev);
    if (closeOnPress) {
      close();
    }
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <ContextMenu.Item
      textValue={textValue}
      disabled={props.disabled ?? undefined}
      onSelect={closeOnPress ? undefined : onSelected}
      asChild
    >
      <Component ref={ref} role='button' onPress={onPress} onKeyDown={onKeyDown} {...props} />
    </ContextMenu.Item>
  );
};

Item.displayName = 'ItemWebContextMenu';
type GroupComponentProps = GroupProps & React.RefAttributes<GroupRef>;

const Group = ({ asChild, ref, ...props }: GroupComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <ContextMenu.Group asChild>
      <Component ref={ref} {...props} />
    </ContextMenu.Group>
  );
};

Group.displayName = 'GroupWebContextMenu';
type LabelComponentProps = LabelProps & React.RefAttributes<LabelRef>;

const Label = ({ asChild, ref, ...props }: LabelComponentProps) => {
  const Component = asChild ? Slot : Text;
  return (
    <ContextMenu.Label asChild>
      <Component ref={ref} {...props} />
    </ContextMenu.Label>
  );
};

Label.displayName = 'LabelWebContextMenu';
type CheckboxItemComponentProps = CheckboxItemProps & React.RefAttributes<CheckboxItemRef>;

const CheckboxItem = ({
  asChild,
  checked,
  onCheckedChange,
  textValue,
  disabled = false,
  closeOnPress = true,
  onPress: onPressProp,
  onKeyDown: onKeyDownProp,
  ref,
  ...props
}: CheckboxItemComponentProps) => {
  const { close } = useContextMenuContentContext();

  function onKeyDown(ev: React.KeyboardEvent) {
    onKeyDownProp?.(ev);
    if (ev.key === 'Enter' || ev.key === ' ') {
      onPressProp?.(EmptyGestureResponderEvent);
      onCheckedChange?.(!checked);
      if (closeOnPress) {
        close();
      }
    }
  }

  function onPress(ev: GestureResponderEvent) {
    onPressProp?.(ev);
    onCheckedChange?.(!checked);
    if (closeOnPress) {
      close();
    }
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <ContextMenu.CheckboxItem
      textValue={textValue}
      checked={checked}
      onCheckedChange={onCheckedChange}
      onSelect={closeOnPress ? undefined : onSelected}
      disabled={disabled ?? undefined}
      asChild
    >
      <Component
        ref={ref}
        disabled={disabled}
        onKeyDown={onKeyDown}
        onPress={onPress}
        role='button'
        {...props}
      />
    </ContextMenu.CheckboxItem>
  );
};

CheckboxItem.displayName = 'CheckboxItemWebContextMenu';

const ContextMenuRadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
} | null>(null);
type RadioGroupComponentProps = RadioGroupProps & React.RefAttributes<RadioGroupRef>;

const RadioGroup = ({ asChild, value, onValueChange, ref, ...props }: RadioGroupComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <ContextMenuRadioGroupContext.Provider value={{ value, onValueChange }}>
      <ContextMenu.RadioGroup value={value} onValueChange={onValueChange} asChild>
        <Component ref={ref} {...props} />
      </ContextMenu.RadioGroup>
    </ContextMenuRadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroupWebContextMenu';

function useContextMenuRadioGroupContext() {
  const context = React.useContext(ContextMenuRadioGroupContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}
type RadioItemComponentProps = RadioItemProps & React.RefAttributes<RadioItemRef>;

const RadioItem = ({
  asChild,
  value,
  textValue,
  closeOnPress = true,
  onPress: onPressProp,
  onKeyDown: onKeyDownProp,
  ref,
  ...props
}: RadioItemComponentProps) => {
  const { onValueChange } = useContextMenuRadioGroupContext();
  const { close } = useContextMenuContentContext();

  function onKeyDown(ev: React.KeyboardEvent) {
    onKeyDownProp?.(ev);
    if (ev.key === 'Enter' || ev.key === ' ') {
      onValueChange?.(value);
      onPressProp?.(EmptyGestureResponderEvent);
      if (closeOnPress) {
        close();
      }
    }
  }

  function onPress(ev: GestureResponderEvent) {
    onValueChange?.(value);
    onPressProp?.(ev);
    if (closeOnPress) {
      close();
    }
  }
  const Component = asChild ? Slot : Pressable;
  return (
    <ContextMenu.RadioItem
      value={value}
      textValue={textValue}
      disabled={props.disabled ?? undefined}
      onSelect={closeOnPress ? undefined : onSelected}
      asChild
    >
      <Component ref={ref} onKeyDown={onKeyDown} onPress={onPress} {...props} />
    </ContextMenu.RadioItem>
  );
};

RadioItem.displayName = 'RadioItemWebContextMenu';
type ItemIndicatorComponentProps = ItemIndicatorProps & React.RefAttributes<ItemIndicatorRef>;

const ItemIndicator = ({ asChild, forceMount, ref, ...props }: ItemIndicatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <ContextMenu.ItemIndicator forceMount={forceMount} asChild>
      <Component ref={ref} {...props} />
    </ContextMenu.ItemIndicator>
  );
};

ItemIndicator.displayName = 'ItemIndicatorWebContextMenu';
type SeparatorComponentProps = SeparatorProps & React.RefAttributes<SeparatorRef>;

const Separator = ({ asChild, decorative, ref, ...props }: SeparatorComponentProps) => {
  const Component = asChild ? Slot : View;
  return (
    <ContextMenu.Separator asChild>
      <Component ref={ref} {...props} />
    </ContextMenu.Separator>
  );
};

Separator.displayName = 'SeparatorWebContextMenu';

const ContextMenuSubContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);
type SubComponentProps = SubProps & React.RefAttributes<SubRef>;

const Sub = ({
  asChild,
  defaultOpen,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  ref,
  ...props
}: SubComponentProps) => {
  const [open = false, onOpenChange] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChangeProp,
  });

  const Component = asChild ? Slot : View;
  return (
    <ContextMenuSubContext.Provider value={{ open, onOpenChange }}>
      <ContextMenu.Sub open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...props} />
      </ContextMenu.Sub>
    </ContextMenuSubContext.Provider>
  );
};

Sub.displayName = 'SubWebContextMenu';

function useSubContext() {
  const context = React.useContext(ContextMenuSubContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}
type SubTriggerComponentProps = SubTriggerProps & React.RefAttributes<SubTriggerRef>;

const SubTrigger = ({
  asChild,
  textValue,
  disabled = false,
  onPress: onPressProp,
  ref,
  ...props
}: SubTriggerComponentProps) => {
  const { onOpenChange } = useSubContext();

  function onPress(ev: GestureResponderEvent) {
    onOpenChange(true);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <ContextMenu.SubTrigger disabled={disabled ?? undefined} textValue={textValue} asChild>
      <Component ref={ref} onPress={onPress} {...props} />
    </ContextMenu.SubTrigger>
  );
};

SubTrigger.displayName = 'SubTriggerWebContextMenu';
type SubContentComponentProps = SubContentProps & React.RefAttributes<SubContentRef>;

const SubContent = ({ asChild = false, forceMount, ref, ...props }: SubContentComponentProps) => {
  const Component = asChild ? Slot : Pressable;
  return (
    <ContextMenu.Portal>
      <ContextMenu.SubContent forceMount={forceMount}>
        <Component ref={ref} {...props} />
      </ContextMenu.SubContent>
    </ContextMenu.Portal>
  );
};

Content.displayName = 'ContentWebContextMenu';

export {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Overlay,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
  useRootContext,
  useSubContext,
};

function onSelected(ev: Event) {
  ev.preventDefault();
}
