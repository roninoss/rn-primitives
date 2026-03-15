import * as Collapsible from '@radix-ui/react-collapsible';
import {
  useComposedRefs,
  useControllableState,
  useIsomorphicLayoutEffect,
} from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type {
  ContentProps,
  ContentRef,
  RootContext,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './types';

const CollapsibleContext = React.createContext<RootContext | null>(null);
type RootComponentProps = RootProps & React.RefAttributes<RootRef>;

const Root = ({
  asChild,
  disabled = false,
  open: openProp,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  ref,
  ...viewProps
}: RootComponentProps) => {
  const [open = false, onOpenChange] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChangeProp,
  });
  const rootRef = React.useRef<RootRef>(null);
  const composedRef = useComposedRefs(ref, rootRef);

  useIsomorphicLayoutEffect(() => {
    if (rootRef.current) {
      const augRef = rootRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = open ? 'open' : 'closed';
    }
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    if (rootRef.current) {
      const augRef = rootRef.current as unknown as HTMLDivElement;
      if (disabled) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [disabled]);

  const Component = asChild ? Slot : View;
  return (
    <CollapsibleContext.Provider
      value={{
        disabled,
        open,
        onOpenChange,
      }}
    >
      <Collapsible.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        disabled={disabled}
      >
        <Component ref={composedRef} {...viewProps} />
      </Collapsible.Root>
    </CollapsibleContext.Provider>
  );
};

Root.displayName = 'RootWebCollapsible';

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      'Collapsible compound components cannot be rendered outside the Collapsible component'
    );
  }
  return context;
}
type TriggerComponentProps = TriggerProps & React.RefAttributes<TriggerRef>;

const Trigger = ({
  asChild,
  onPress: onPressProp,
  disabled: disabledProp = false,
  ref,
  ...props
}: TriggerComponentProps) => {
  const { disabled, open, onOpenChange } = useCollapsibleContext();
  const triggerRef = React.useRef<TriggerRef>(null);
  const composedRef = useComposedRefs(ref, triggerRef);

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const augRef = triggerRef.current as unknown as HTMLButtonElement;
      augRef.dataset.state = open ? 'open' : 'closed';
    }
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    if (triggerRef.current) {
      const augRef = triggerRef.current as unknown as HTMLButtonElement;
      augRef.type = 'button';

      if (disabled) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [disabled]);

  function onPress(ev: GestureResponderEvent) {
    onPressProp?.(ev);
    onOpenChange(!open);
  }

  const Component = asChild ? Slot : Pressable;
  return (
    <Collapsible.Trigger disabled={disabled} asChild>
      <Component ref={composedRef} role='button' onPress={onPress} disabled={disabled} {...props} />
    </Collapsible.Trigger>
  );
};

Trigger.displayName = 'TriggerWebCollapsible';
type ContentComponentProps = ContentProps & React.RefAttributes<ContentRef>;

const Content = ({ asChild, forceMount, ref, ...props }: ContentComponentProps) => {
  const contentRef = React.useRef<ContentRef>(null);
  const composedRef = useComposedRefs(ref, contentRef);
  const { open } = useCollapsibleContext();

  useIsomorphicLayoutEffect(() => {
    if (contentRef.current) {
      const augRef = contentRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = open ? 'open' : 'closed';
    }
  }, [open]);

  const Component = asChild ? Slot : View;
  return (
    <Collapsible.Content forceMount={forceMount} asChild>
      <Component ref={composedRef} {...props} />
    </Collapsible.Content>
  );
};

Content.displayName = 'ContentWebCollapsible';

export { Content, Root, Trigger };
