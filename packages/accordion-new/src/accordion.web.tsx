import * as React from 'react';
import type { PressableProps, PressableStateCallbackType } from 'react-native';
import {
  Content as ContentWeb,
  Header as HeaderWeb,
  Item as ItemWeb,
  Root as RootWeb,
  Trigger as TriggerWeb,
  useItemContext,
  useRootContext,
} from './accordion-web';
import { convertStyleForWeb } from './convert-style-for-web';
import { BaseAccordionTriggerRef } from './types/base';
import type {
  ContentProps,
  HeaderProps,
  ItemProps,
  RootProps,
  TriggerProps,
  TriggerRef,
} from './types/universal';
import type { AccordionTriggerWebOnlyRef } from './types/web-only';

function Root({ native: _native, web, style, ...props }: RootProps) {
  return <RootWeb {...props} style={convertStyleForWeb(style)} {...web} />;
}

function Content({ native: _native, style, web, ...props }: ContentProps) {
  return <ContentWeb {...props} style={convertStyleForWeb(style)} {...web} />;
}

function Header({ native: _native, style, web, ...props }: HeaderProps) {
  return <HeaderWeb {...props} style={convertStyleForWeb(style)} {...web} />;
}

function Item({ native: _native, style, web, ...props }: ItemProps) {
  return <ItemWeb {...props} style={convertStyleForWeb(style)} {...web} />;
}

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(
  (
    {
      native: _native,
      style: styleProp,
      children: childrenProp,
      onPress,
      onPressIn,
      onPressOut,
      web,
      ...props
    },
    ref
  ) => {
    const { children, events, style } = useWebPressableProps({
      styleProp,
      childrenProp,
      webProps: web,
      onPressIn,
      onPressOut,
    });

    return (
      <TriggerWeb
        ref={ref as React.LegacyRef<AccordionTriggerWebOnlyRef & BaseAccordionTriggerRef>}
        children={children}
        style={style}
        onClick={onPress}
        {...props}
        {...web}
        {...events}
      />
    );
  }
);

// TODO: move useWebPressableProps to a separate file
type WebPressableProps = Pick<
  React.ComponentPropsWithoutRef<'button'>,
  'onFocus' | 'onBlur' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseDown' | 'onMouseUp'
>;

// TODO: refactor this - maybe take all props or something like that
function useWebPressableProps({
  childrenProp,
  styleProp,
  webProps,
  onPressIn,
  onPressOut,
}: {
  styleProp: PressableProps['style'];
  childrenProp: PressableProps['children'];
  webProps?: WebPressableProps;
  onPressIn?: () => void;
  onPressOut?: () => void;
}) {
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const events = React.useMemo(() => {
    return {
      onFocus: (ev: React.FocusEvent<HTMLButtonElement, Element>) => {
        setFocused(true);
        webProps?.onFocus?.(ev);
      },
      onBlur: (ev: React.FocusEvent<HTMLButtonElement, Element>) => {
        setFocused(false);
        webProps?.onBlur?.(ev);
      },
      onMouseEnter: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setHovered(true);
        webProps?.onMouseEnter?.(ev);
      },
      onMouseLeave: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setHovered(false);
        webProps?.onMouseLeave?.(ev);
      },
      onMouseDown: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setPressed(true);
        if (webProps?.onMouseDown) {
          webProps.onMouseDown?.(ev);
          return;
        }
        onPressIn?.();
      },
      onMouseUp: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setPressed(false);
        if (webProps?.onMouseUp) {
          webProps?.onMouseUp?.(ev);
          return;
        }
        onPressOut?.();
      },
    };
  }, [
    webProps?.onFocus,
    webProps?.onBlur,
    webProps?.onMouseEnter,
    webProps?.onMouseLeave,
    webProps?.onMouseDown,
    webProps?.onMouseUp,
    onPressIn,
    onPressOut,
  ]);

  const style = React.useMemo(() => {
    if (!styleProp) {
      return;
    }
    return convertStyleForWeb(
      typeof styleProp === 'function'
        ? styleProp({ focused, hovered, pressed } as PressableStateCallbackType)
        : styleProp
    );
  }, [styleProp, focused, hovered, pressed]);

  return {
    style,
    events,
    children:
      typeof childrenProp === 'function'
        ? childrenProp({ focused, hovered, pressed } as PressableStateCallbackType)
        : childrenProp,
  };
}

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };

export type { ContentProps, HeaderProps, ItemProps, RootProps, TriggerProps, TriggerRef };

// function flattenStyle<T>(style?: StyleProp<T>) {
//   if (!style) {
//     return undefined;
//   }
//   const reactNativeStyle = Array.isArray(style) ? StyleSheet.flatten(style) : style;
//   return StyleSheet.create<StyleSheet.NamedStyles<T>>(
//     reactNativeStyle as StyleSheet.NamedStyles<T> & StyleSheet.NamedStyles<any>
//   ) as React.CSSProperties;
// }

// function normalizeStyle(style?: ViewStyle) {}

// const normalizeBackgroundColor = (color: ViewStyle['backgroundColor']): string | undefined => {
//   if (typeof color === 'string') return color; // Already valid
//   if (!color) return undefined; // No color set
//   return String(color); // Force conversion
// };

// // Extract shared properties that have the same type in both ViewStyle and CSSProperties
// type SharedStyle = {
//   [K in keyof ViewStyle & keyof React.CSSProperties as ViewStyle[K] extends React.CSSProperties[K]
//     ? K
//     : never]: ViewStyle[K];
// };

// // Extract properties that either:
// // 1. Exist only in ViewStyle
// // 2. Exist in both but have different types
// type DifferenceStyle = {
//   [K in keyof ViewStyle]: K extends keyof React.CSSProperties
//     ? ViewStyle[K] extends React.CSSProperties[K]
//       ? never
//       : K
//     : K;
// }[keyof ViewStyle] extends infer DiffKeys
//   ? DiffKeys extends keyof ViewStyle
//     ? Pick<ViewStyle, DiffKeys>
//     : never
//   : never;

// // normalizeColor https://github.dev/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/compiler/normalizeColor.js
// type CSSColor = React.CSSProperties['color'];

// // normalizeValueWithProperty https://github.dev/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/compiler/normalizeValueWithProperty.js

// // resolveShadowValue https://github.dev/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/compiler/resolveShadowValue.js

// // createReactDOMStyle https://github.dev/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/compiler/createReactDOMStyle.js

// const PROPERTIES_STANDARD = {
//   borderBottomEndRadius: 'borderEndEndRadius',
//   borderBottomStartRadius: 'borderEndStartRadius',
//   borderTopEndRadius: 'borderStartEndRadius',
//   borderTopStartRadius: 'borderStartStartRadius',
//   borderEndColor: 'borderInlineEndColor',
//   borderEndStyle: 'borderInlineEndStyle',
//   borderEndWidth: 'borderInlineEndWidth',
//   borderStartColor: 'borderInlineStartColor',
//   borderStartStyle: 'borderInlineStartStyle',
//   borderStartWidth: 'borderInlineStartWidth',
//   end: 'insetInlineEnd',
//   marginEnd: 'marginInlineEnd',
//   marginHorizontal: 'marginInline',
//   marginStart: 'marginInlineStart',
//   marginVertical: 'marginBlock',
//   paddingEnd: 'paddingInlineEnd',
//   paddingHorizontal: 'paddingInline',
//   paddingStart: 'paddingInlineStart',
//   paddingVertical: 'paddingBlock',
//   start: 'insetInlineStart',
// };

// const ignoredProps = {
//   elevation: true,
//   overlayColor: true,
//   resizeMode: true,
//   tintColor: true,
// };

// const obj = {
//   animationKeyframes: '', // key of animated, need to get animation names to convert to css https://github.dev/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/index.js
//   backgroundColor: '',
//   borderBlockColor: '',
//   borderBlockEndColor: '',
//   borderBlockStartColor: '',
//   borderBottomColor: '',
//   borderColor: '',
//   borderEndColor: '',
//   borderBottomEndRadius: 0,
//   borderBottomLeftRadius: 0,
//   borderBottomRightRadius: 0,
//   borderBottomStartRadius: 0,
//   borderCurve: 'circular',
//   borderEndEndRadius: 0,
//   borderEndStartRadius: 0,
//   borderLeftColor: '',
//   borderRadius: 0,
//   borderRightColor: '',
//   borderStartColor: '',
//   borderStartEndRadius: 0,
//   borderStartStartRadius: 0,
//   borderTopColor: '',
//   borderTopEndRadius: 0,
//   borderTopLeftRadius: 0,
//   borderTopRightRadius: 0,
//   borderTopStartRadius: 0,
//   borderEndWidth: 0,
//   borderStartWidth: 0,
//   bottom: 0,
//   boxShadow: '',
//   elevation: 0,
//   end: 0,
//   flexBasis: 0,
//   enableBackground: '',
//   filter: '',
//   height: 0,
//   left: 0,
//   margin: 0,
//   marginBottom: 0,
//   marginEnd: 0,
//   marginHorizontal: 0,
//   marginLeft: 0,
//   marginRight: 0,
//   marginStart: 0,
//   marginTop: 0,
//   marginVertical: 0,
//   maxHeight: 0,
//   maxWidth: 0,
//   minHeight: 0,
//   minWidth: 0,
//   opacity: 0,
//   inset: 0,
//   padding: 0,
//   paddingBottom: 0,
//   insetBlock: 0,
//   insetBlockEnd: 0,
//   insetBlockStart: 0,
//   insetInline: 0,
//   insetInlineEnd: 0,
//   insetInlineStart: 0,
//   paddingEnd: 0,
//   paddingHorizontal: 0,
//   paddingLeft: 0,
//   paddingRight: 0,
//   paddingStart: 0,
//   paddingTop: 0,
//   paddingVertical: 0,
//   right: 0,
//   start: 0,
//   top: 0,
//   width: 0,
//   marginBlock: 0,
//   marginBlockEnd: 0,
//   marginBlockStart: 0,
//   marginInline: 0,
//   marginInlineEnd: 0,
//   marginInlineStart: 0,
//   paddingBlock: 0,
//   paddingBlockEnd: 0,
//   paddingBlockStart: 0,
//   paddingInline: 0,
//   paddingInlineEnd: 0,
//   paddingInlineStart: 0,
//   pointerEvents: 'auto',
//   shadowColor: '',
//   shadowOffset: undefined,
//   shadowOpacity: 0,
//   shadowRadius: 0,
//   transform: '',
//   transformOrigin: '',
//   writingDirection: 'auto',
// } satisfies DifferenceStyle;

// const style = obj satisfies ImageStyle['overlayColor'];

// const webStyle: CSSColor = '#deaea' satisfies React.CSSProperties['borderBottomLeftRadius'];
