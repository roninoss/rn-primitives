import { useAugmentedRef, useControllableState } from '@rn-primitives/hooks';
import { Slot } from '@rn-primitives/slot';
import * as React from 'react';
import { type GestureResponderEvent } from 'react-native';
import { AnimatablePressable, AnimatableView } from '@rn-primitives/animatable';
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

const AccordionContext = React.createContext<Omit<
  BaseAccordionRootProps,
  'asChild' | 'defaultValue' | 'children'
> | null>(null);

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
    const [value = type === 'multiple' ? [] : undefined, onValueChange] = useControllableState<
      (string | undefined) | string[]
    >({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChangeProps as (state: string | string[] | undefined) => void,
    });

    const Component = asChild ? Slot<typeof AnimatableView> : AnimatableView;
    return (
      <AccordionContext.Provider
        value={{
          type,
          disabled,
          collapsible,
          value,
          onValueChange,
          dir,
          orientation,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </AccordionContext.Provider>
    );
  }
);

Root.displayName = 'AccordionRootNative';

function useRootContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion compound components cannot be rendered outside the Accordion component'
    );
  }
  return context;
}

type AccordionItemContextType = Omit<BaseAccordionItemProps, 'asChild' | 'children'> & {
  nativeID: string;
  isExpanded: boolean;
};

const AccordionItemContext = React.createContext<AccordionItemContextType | null>(null);

type AccordionItemNativeProps = AccordionItemNativeOnlyProps & BaseAccordionItemProps;
type AccordionItemNativeRef = AccordionItemNativeOnlyRef;

const Item = React.forwardRef<AccordionItemNativeRef, AccordionItemNativeProps>(
  ({ asChild, value, disabled, ...viewProps }, ref) => {
    const { value: rootValue } = useRootContext();
    const nativeID = React.useId();

    const Component = asChild ? Slot<typeof AnimatableView> : AnimatableView;
    return (
      <AccordionItemContext.Provider
        value={{
          value,
          disabled,
          nativeID,
          isExpanded: isItemExpanded(rootValue, value),
        }}
      >
        <Component ref={ref} {...viewProps} />
      </AccordionItemContext.Provider>
    );
  }
);

Item.displayName = 'AccordionItemNative';

function useItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component'
    );
  }
  return context;
}

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
      onValueChange,
      value: rootValue,
      collapsible,
    } = useRootContext();
    const { nativeID, disabled: itemDisabled, value, isExpanded } = useItemContext();

    const methods = React.useMemo(() => {
      return {
        trigger: () => {
          if (type === 'single') {
            const newValue = collapsible ? (value === rootValue ? undefined : value) : value;
            onValueChange?.(newValue as string[] & string);
          }
          if (type === 'multiple') {
            const rootToArray = toStringArray(rootValue);
            const newValue = collapsible
              ? rootToArray.includes(value)
                ? rootToArray.filter((val) => val !== value)
                : rootToArray.concat(value)
              : [...new Set(rootToArray.concat(value))];
            onValueChange?.(newValue as string[] & string);
          }
        },
      };
    }, [collapsible, onValueChange, rootValue, type, value]);

    const triggerRef = useAugmentedRef({ ref, methods });

    const isDisabled = !!(disabledProp || rootDisabled || itemDisabled);

    const accessibilityState = React.useMemo(() => {
      return {
        expanded: isExpanded,
        disabled: isDisabled,
      };
    }, [isDisabled, isExpanded]);

    const onPress = React.useCallback(
      (ev: GestureResponderEvent) => {
        methods.trigger();
        if (typeof onPressProp === 'function') {
          onPressProp?.(ev);
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
        accessibilityState={accessibilityState}
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

function isItemExpanded(rootValue: string | string[] | undefined, value: string) {
  return Array.isArray(rootValue) ? rootValue.includes(value) : rootValue === value;
}
