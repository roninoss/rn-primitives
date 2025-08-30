import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {
  useAugmentedRef,
  useControllableState,
  useIsomorphicLayoutEffect,
} from '@rn-primitives/hooks';
import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import type {
  ActionProps,
  ActionRef,
  CancelProps,
  CancelRef,
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootContext,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
  TriggerProps,
  TriggerRef,
} from './types';

const AlertDialogContext = React.createContext<RootContext | null>(null);

function Root({ ref, asChild, open: openProp, defaultOpen, onOpenChange: onOpenChangeProp, ...viewProps  }: RootProps & { ref?: React.Ref<RootRef> }) {
    const [open = false, onOpenChange] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChangeProp,
    });
    const Component = asChild ? Slot.View : View;
    return (
      <AlertDialogContext.Provider value={{ open, onOpenChange }}>
        <AlertDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
          <Component ref={ref} {...viewProps} />
        </AlertDialog.Root>
      </AlertDialogContext.Provider>
    );
  }
);

Root.displayName = 'RootAlertWebDialog';

function useRootContext() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      'AlertDialog compound components cannot be rendered outside the AlertDialog component'
    );
  }
  return context;
}

function Trigger({ ref, asChild, onPress: onPressProp, role: _role, disabled, ...props  }: TriggerProps & { ref?: React.Ref<TriggerRef> }) {
    const augmentedRef = useAugmentedRef({ ref });
    const { onOpenChange, open } = useRootContext();
    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      onOpenChange(!open);
    }

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.dataset.state = open ? 'open' : 'closed';
        augRef.type = 'button';
      }
    }, [open]);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <AlertDialog.Trigger disabled={disabled ?? undefined} asChild>
        <Component
          ref={augmentedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </AlertDialog.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerAlertWebDialog';

function Portal({ forceMount, container, children }: PortalProps) {
  return <AlertDialog.Portal forceMount={forceMount} children={children} container={container} />;
}

function Overlay({ ref, asChild, forceMount, ...props  }: OverlayProps & { ref?: React.Ref<OverlayRef> }) {
    const Component = asChild ? Slot.View : View;
    return (
      <AlertDialog.Overlay forceMount={forceMount}>
        <Component ref={ref} {...props} />
      </AlertDialog.Overlay>
    );
  }
);

Overlay.displayName = 'OverlayAlertWebDialog';

function Content({ ref, asChild, forceMount, onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, ...props  }: ContentProps & { ref?: React.Ref<ContentRef> }) {
    const augmentedRef = useAugmentedRef({ ref });
    const { open } = useRootContext();

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.state = open ? 'open' : 'closed';
      }
    }, [open]);

    const Component = asChild ? Slot.View : View;
    return (
      <AlertDialog.Content
        onOpenAutoFocus={onOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onEscapeKeyDown={onEscapeKeyDown}
        forceMount={forceMount}
        asChild
      >
        <Component ref={augmentedRef} {...props} />
      </AlertDialog.Content>
    );
  }
);

Content.displayName = 'ContentAlertWebDialog';

function Cancel({ ref, asChild, onPress: onPressProp, disabled, ...props  }: CancelProps & { ref?: React.Ref<CancelRef> }) {
    const augmentedRef = useAugmentedRef({ ref });
    const { onOpenChange, open } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      onOpenChange(!open);
    }

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.type = 'button';
      }
    }, []);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <AlertDialog.Cancel disabled={disabled ?? undefined} asChild>
          <Component
            ref={augmentedRef}
            onPress={onPress}
            role='button'
            disabled={disabled}
            {...props}
          />
        </AlertDialog.Cancel>
      </>
    );
  }
);

Cancel.displayName = 'CancelAlertWebDialog';

function Action({ ref, asChild, onPress: onPressProp, disabled, ...props  }: ActionProps & { ref?: React.Ref<ActionRef> }) {
    const augmentedRef = useAugmentedRef({ ref });
    const { onOpenChange, open } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      onOpenChange(!open);
    }

    useIsomorphicLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.type = 'button';
      }
    }, []);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <AlertDialog.Action disabled={disabled ?? undefined} asChild>
          <Component
            ref={augmentedRef}
            onPress={onPress}
            role='button'
            disabled={disabled}
            {...props}
          />
        </AlertDialog.Action>
      </>
    );
  }
);

Action.displayName = 'ActionAlertWebDialog';

function Title({ ref, asChild, ...props  }: TitleProps & { ref?: React.Ref<TitleRef> }) {
  const Component = asChild ? Slot.Text : Text;
  return (
    <AlertDialog.Title asChild>
      <Component ref={ref} {...props} />
    </AlertDialog.Title>
  );
});

Title.displayName = 'TitleAlertWebDialog';

function Description({ ref, asChild, ...props  }: DescriptionProps & { ref?: React.Ref<DescriptionRef> }) {
    const Component = asChild ? Slot.Text : Text;
    return (
      <AlertDialog.Description asChild>
        <Component ref={ref} {...props} />
      </AlertDialog.Description>
    );
  }
);

Description.displayName = 'DescriptionAlertWebDialog';

export {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
  useRootContext,
};
