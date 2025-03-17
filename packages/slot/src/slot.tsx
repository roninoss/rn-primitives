import * as React from 'react';
import {
  type PressableProps,
  Image as RNImage,
  Pressable as RNPressable,
  Text as RNText,
  View as RNView,
  StyleSheet,
  type PressableStateCallbackType,
  type ImageProps as RNImageProps,
  type ImageStyle as RNImageStyle,
  type PressableProps as RNPressableProps,
  type TextProps as RNTextProps,
  type ViewProps as RNViewProps,
  type StyleProp,
} from 'react-native';

// TODO: test the slot component
// TODO: if all works, remove other slots
function Slot<T extends React.ElementType>(props: React.ComponentProps<T>) {
  const { children, ref: forwardedRef, ...restOfProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot - Invalid asChild element', children);
    return null;
  }

  if (isTextChildren(children)) {
    console.log('Slot - Text children are not supported', children);
    return null;
  }

  const childrenProps = (children.props as Record<string, any>) ?? {};

  if (children.type === React.Fragment) {
    return (
      <>
        {React.Children.toArray(childrenProps.children).map((child): any =>
          React.isValidElement(child)
            ? Slot({ ...restOfProps, ref: forwardedRef, children: child })
            : child
        )}
      </>
    );
  }

  const { ref: childRef, ...childProps } = childrenProps;

  return React.cloneElement(children, {
    ...mergeProps(restOfProps, childProps),
    ...(children.type === 'function'
      ? {}
      : {
          ref: forwardedRef ? composeRefs(forwardedRef, childRef) : childRef,
        }),
  } as unknown as Partial<React.ComponentProps<T>>);
}

Slot.displayName = 'Slot';

/**
 * @deprecated: Use Slot instead
 */
const Pressable = ({
  ref: forwardedRef,
  ...props
}: RNPressableProps & {
  ref: React.RefObject<React.ElementRef<typeof RNPressable>>;
}) => {
  const { children, ...pressableSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.Pressable - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNPressable>,
    React.Component<Omit<PressableProps & React.RefAttributes<RNView>, 'ref'>, any, any>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(pressableSlotProps, children.props as any),
    ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
  });
};

Pressable.displayName = 'SlotPressable';

/**
 * @deprecated: Use Slot instead
 */
const View = ({
  ref: forwardedRef,
  ...props
}: RNViewProps & {
  ref: React.RefObject<React.ElementRef<typeof RNView>>;
}) => {
  const { children, ...viewSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.View - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNView>,
    React.ElementRef<typeof RNView>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(viewSlotProps, children.props as any),
    ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
  });
};

View.displayName = 'SlotView';

/**
 * @deprecated: Use Slot instead
 */
const Text = ({
  ref: forwardedRef,
  ...props
}: RNTextProps & {
  ref: React.RefObject<React.ElementRef<typeof RNText>>;
}) => {
  const { children, ...textSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.Text - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNText>,
    React.ElementRef<typeof RNText>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(textSlotProps, children.props as any),
    ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
  });
};

Text.displayName = 'SlotText';

type ImageSlotProps = RNImageProps & {
  children?: React.ReactNode;
};

/**
 * @deprecated: Use Slot instead
 */
const Image = ({
  ref: forwardedRef,
  ...props
}: ImageSlotProps & {
  ref: React.RefObject<React.ElementRef<typeof RNImage>>;
}) => {
  const { children, ...imageSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.Image - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNImage>,
    React.ElementRef<typeof RNImage>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(imageSlotProps, children.props as any),
    ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
  });
};

Image.displayName = 'SlotImage';

export { Slot, Image, Pressable, Text, View };

// This project uses code from WorkOS/Radix Primitives.
// The code is licensed under the MIT License.
// https://github.com/radix-ui/primitives/tree/main

function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) =>
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as React.RefObject<T>).current = node;
      }
    });
}

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === 'style') {
      overrideProps[propName] = combineStyles(slotPropValue, childPropValue);
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

type PressableStyle = RNPressableProps['style'];
type ImageStyle = StyleProp<RNImageStyle>;
type Style = PressableStyle | ImageStyle;

function combineStyles(slotStyle?: Style, childValue?: Style) {
  if (typeof slotStyle === 'function' && typeof childValue === 'function') {
    return (state: PressableStateCallbackType) => {
      return StyleSheet.flatten([slotStyle(state), childValue(state)]);
    };
  }
  if (typeof slotStyle === 'function') {
    return (state: PressableStateCallbackType) => {
      return childValue ? StyleSheet.flatten([slotStyle(state), childValue]) : slotStyle(state);
    };
  }
  if (typeof childValue === 'function') {
    return (state: PressableStateCallbackType) => {
      return slotStyle ? StyleSheet.flatten([slotStyle, childValue(state)]) : childValue(state);
    };
  }

  return StyleSheet.flatten([slotStyle, childValue].filter(Boolean));
}

export function isTextChildren(
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode)
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}
