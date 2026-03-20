import * as React from 'react';
import {
  Image as RNImage,
  Pressable as RNPressable,
  Text as RNText,
  View as RNView,
  type PressableStateCallbackType,
  type ImageProps as RNImageProps,
  type ImageStyle as RNImageStyle,
  type PressableProps as RNPressableProps,
  type TextProps as RNTextProps,
  type ViewProps as RNViewProps,
  type StyleProp,
} from 'react-native';

function Slot<T extends React.ElementType>(props: React.ComponentPropsWithRef<T>) {
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
    ref: forwardedRef ? composeRefs(forwardedRef, childRef) : childRef,
  } as unknown as Partial<React.ComponentPropsWithRef<T>>);
}

Slot.displayName = 'Slot';

/**
 * @deprecated: Use Slot instead
 */
const Pressable = ({
  ref: forwardedRef,
  ...props
}: RNPressableProps & {
  ref?: React.Ref<React.ComponentRef<typeof RNPressable>>;
}) => {
  const { children, ...pressableSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.Pressable - Invalid asChild element', children);
    return null;
  }

  const childProps = (children.props as AnyProps) ?? {};
  const childRef = childProps.ref as React.Ref<React.ComponentRef<typeof RNPressable>> | undefined;

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNPressable>,
    React.Component<Omit<RNPressableProps & React.RefAttributes<RNView>, 'ref'>, any, any>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(pressableSlotProps, childProps),
    ref: forwardedRef ? composeRefs(forwardedRef, childRef) : childRef,
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
  ref?: React.Ref<React.ComponentRef<typeof RNView>>;
}) => {
  const { children, ...viewSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.View - Invalid asChild element', children);
    return null;
  }

  const childProps = (children.props as AnyProps) ?? {};
  const childRef = childProps.ref as React.Ref<React.ComponentRef<typeof RNView>> | undefined;

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNView>,
    React.ComponentRef<typeof RNView>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(viewSlotProps, childProps),
    ref: forwardedRef ? composeRefs(forwardedRef, childRef) : childRef,
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
  ref?: React.Ref<React.ComponentRef<typeof RNText>>;
}) => {
  const { children, ...textSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.Text - Invalid asChild element', children);
    return null;
  }

  const childProps = (children.props as AnyProps) ?? {};
  const childRef = childProps.ref as React.Ref<React.ComponentRef<typeof RNText>> | undefined;

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNText>,
    React.ComponentRef<typeof RNText>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(textSlotProps, childProps),
    ref: forwardedRef ? composeRefs(forwardedRef, childRef) : childRef,
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
  ref?: React.Ref<React.ComponentRef<typeof RNImage>>;
}) => {
  const { children, ...imageSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.Image - Invalid asChild element', children);
    return null;
  }

  const childProps = (children.props as AnyProps) ?? {};
  const childRef = childProps.ref as React.Ref<React.ComponentRef<typeof RNImage>> | undefined;

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNImage>,
    React.ComponentRef<typeof RNImage>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(imageSlotProps, childProps),
    ref: forwardedRef ? composeRefs(forwardedRef, childRef) : childRef,
  });
};

Image.displayName = 'SlotImage';

export { Slot, Image, Pressable, Text, View };

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null): (() => void) | void {
  if (typeof ref === 'function') {
    const cleanup = ref(value);

    if (typeof cleanup === 'function') {
      return cleanup;
    }

    return;
  }

  if (ref != null) {
    ref.current = value;
    return () => {
      ref.current = null;
    };
  }
}

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  let cleanups: Array<() => void> = [];

  return (node) => {
    cleanups.forEach((cleanup) => cleanup());
    cleanups = [];

    if (node == null) {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(null);
        } else if (ref != null) {
          ref.current = null;
        }
      });
      return;
    }

    cleanups = refs
      .map((ref) => setRef(ref, node))
      .filter((cleanup): cleanup is () => void => cleanup != null);
  };
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
      return [slotStyle(state), childValue(state)];
    };
  }
  if (typeof slotStyle === 'function') {
    return (state: PressableStateCallbackType) => {
      return childValue ? [slotStyle(state), childValue] : slotStyle(state);
    };
  }
  if (typeof childValue === 'function') {
    return (state: PressableStateCallbackType) => {
      return slotStyle ? [slotStyle, childValue(state)] : childValue(state);
    };
  }

  if (slotStyle && childValue) {
    return [slotStyle, childValue];
  }

  return slotStyle ?? childValue;
}

export function isTextChildren(
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode)
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}
