import { AnimatablePressable, AnimatableView } from '@rn-primitives/animatable';
import { useAugmentedRef, useControllableState } from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import type {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionRootProps,
  BaseAccordionTriggerProps,
  BaseAccordionTriggerRef,
} from './types/base';
import type {
  AccordionContentNativeOnlyProps,
  AccordionContentNativeOnlyRef,
  AccordionHeaderNativeOnlyProps,
  AccordionHeaderNativeOnlyRef,
  AccordionItemNativeOnlyProps,
  AccordionItemNativeOnlyRef,
  AccordionRootNativeOnlyProps,
  AccordionRootNativeOnlyRef,
  AccordionTriggerNativeOnlyProps,
  AccordionTriggerNativeOnlyRef,
} from './types/native-only';
import {
  RootContext,
  createItemContext,
  createUseItemContext,
  useRootContext,
} from './utils/contexts';
import { isItemExpanded } from './utils/is-item-expanded';

type AccordionRootNativeProps = AccordionRootNativeOnlyProps & BaseAccordionRootProps;
type AccordionRootNativeRef = AccordionRootNativeOnlyRef;

const Root = React.forwardRef<AccordionRootNativeRef, AccordionRootNativeProps>(
  (
    {
      asChild,
      type,
      disabled = false,
      collapsible = true,
      value: valueProp,
      onValueChange: onValueChangeProps,
      defaultValue,
      orientation,
      dir,
      ...viewProps
    },
    ref
  ) => {
    const [rootValue = type === 'multiple' ? [] : undefined, onRootValueChange] =
      useControllableState<(string | undefined) | string[]>({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChangeProps as (state: string | string[] | undefined) => void,
      });

    const Component = asChild ? Slot<typeof AnimatableView> : AnimatableView;
    return (
      <RootContext.Provider
        value={{
          type,
          disabled,
          collapsible,
          rootValue,
          onRootValueChange,
          dir,
          orientation,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    );
  }
);

Root.displayName = 'AccordionRootNative';

const AccordionItemContext = createItemContext<{ nativeID: string }>();
const useItemContext = createUseItemContext(AccordionItemContext);

type AccordionItemNativeProps = AccordionItemNativeOnlyProps & BaseAccordionItemProps;
type AccordionItemNativeRef = AccordionItemNativeOnlyRef;

const Item = React.forwardRef<AccordionItemNativeRef, AccordionItemNativeProps>(
  ({ asChild, value: itemValue, disabled, ...viewProps }, ref) => {
    const { rootValue } = useRootContext();
    const nativeID = React.useId();

    const Component = asChild ? Slot<typeof AnimatableView> : AnimatableView;
    return (
      <AccordionItemContext.Provider
        value={{
          itemValue,
          disabled,
          nativeID,
          isExpanded: isItemExpanded(rootValue, itemValue),
        }}
      >
        <Component ref={ref} {...viewProps} />
      </AccordionItemContext.Provider>
    );
  }
);

Item.displayName = 'AccordionItemNative';

type AccordionHeaderNativeProps = AccordionHeaderNativeOnlyProps & BaseAccordionHeaderProps;
type AccordionHeaderNativeRef = AccordionHeaderNativeOnlyRef;

const Header = React.forwardRef<AccordionHeaderNativeRef, AccordionHeaderNativeProps>(
  ({ asChild, ...props }, ref) => {
    const { disabled: rootDisabled } = useRootContext();
    const { disabled: itemDisabled, isExpanded } = useItemContext();

    const Component = asChild ? Slot<typeof AnimatableView> : AnimatableView;
    return (
      <Component
        ref={ref}
        role='heading'
        aria-expanded={isExpanded}
        aria-disabled={rootDisabled ?? itemDisabled}
        {...props}
      />
    );
  }
);

Header.displayName = 'AccordionHeaderNative';

type AccordionTriggerNativeProps = AccordionTriggerNativeOnlyProps & BaseAccordionTriggerProps;
type AccordionTriggerNativeRef = AccordionTriggerNativeOnlyRef & BaseAccordionTriggerRef;

const Trigger = React.forwardRef<AccordionTriggerNativeRef, AccordionTriggerNativeProps>(
  ({ asChild, onPress: onPressProp, disabled: disabledProp, ...props }, ref) => {
    const {
      disabled: rootDisabled,
      type,
      onRootValueChange,
      rootValue,
      collapsible,
    } = useRootContext();
    const { nativeID, disabled: itemDisabled, itemValue, isExpanded } = useItemContext();

    const methods = React.useMemo(() => {
      return {
        trigger: () => {
          if (type === 'single') {
            const newValue = collapsible
              ? itemValue === rootValue
                ? undefined
                : itemValue
              : itemValue;
            onRootValueChange?.(newValue as string[] & string);
          }
          if (type === 'multiple') {
            const rootToArray = toStringArray(rootValue);
            const newValue = collapsible
              ? rootToArray.includes(itemValue)
                ? rootToArray.filter((val) => val !== itemValue)
                : rootToArray.concat(itemValue)
              : [...new Set(rootToArray.concat(itemValue))];
            onRootValueChange?.(newValue as string[] & string);
          }
        },
      };
    }, [collapsible, onRootValueChange, rootValue, type, itemValue]);

    const triggerRef = useAugmentedRef({ ref, methods });

    const isDisabled = !!(disabledProp || rootDisabled || itemDisabled);

    const onPress = React.useCallback(
      (ev: GestureResponderEvent) => {
        methods.trigger();
        if (typeof onPressProp === 'function') {
          onPressProp(ev);
        }
      },
      [onPressProp, methods]
    );

    const Component = asChild ? Slot<typeof AnimatablePressable> : AnimatablePressable;
    return (
      <Component
        ref={triggerRef}
        nativeID={nativeID}
        aria-disabled={isDisabled}
        role='button'
        onPress={onPress}
        aria-expanded={isExpanded}
        disabled={isDisabled}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'AccordionTriggerNative';

type AccordionContentNativeProps = AccordionContentNativeOnlyProps & BaseAccordionContentProps;
type AccordionContentNativeRef = AccordionContentNativeOnlyRef;

const Content = React.forwardRef<AccordionContentNativeOnlyRef, AccordionContentNativeProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { type } = useRootContext();
    const { nativeID, isExpanded } = useItemContext();

    if (!forceMount) {
      if (!isExpanded) {
        return null;
      }
    }

    const Component = asChild ? Slot<typeof AnimatableView> : AnimatableView;
    return (
      <Component
        ref={ref}
        aria-hidden={!(forceMount || isExpanded)}
        aria-labelledby={nativeID}
        role={type === 'single' ? 'region' : 'summary'}
        {...props}
      />
    );
  }
);

Content.displayName = 'AccordionContentNative';

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };

export type {
  AccordionContentNativeProps as ContentProps,
  AccordionContentNativeRef as ContentRef,
  AccordionHeaderNativeProps as HeaderProps,
  AccordionHeaderNativeRef as HeaderRef,
  AccordionItemNativeProps as ItemProps,
  AccordionItemNativeRef as ItemRef,
  AccordionRootNativeProps as RootProps,
  AccordionRootNativeRef as RootRef,
  AccordionTriggerNativeProps as TriggerProps,
  AccordionTriggerNativeRef as TriggerRef,
};

function toStringArray(value?: string | string[]) {
  return Array.isArray(value) ? value : value ? [value] : [];
}
