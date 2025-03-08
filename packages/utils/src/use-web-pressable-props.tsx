import * as React from 'react';
import type { PressableProps, PressableStateCallbackType } from 'react-native';
import { rnStyleToWebStyle } from './style/rn-style-to-web-style';

type Element =
  | 'article'
  | 'header'
  | 'button'
  | 'aside'
  | 'footer'
  | 'figure'
  | 'form'
  | 'ul'
  | 'li'
  | 'main'
  | 'nav'
  | 'section'
  | 'div';

type WebPressableProps<T extends Element> = Pick<
  React.ComponentPropsWithoutRef<T>,
  'onFocus' | 'onBlur' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseDown' | 'onMouseUp'
>;

export function useWebPressableProps<T extends Element>({
  childrenProp,
  styleProp,
  webProps,
  onPressInProp,
  onPressOutProp,
}: {
  styleProp: PressableProps['style'];
  childrenProp: PressableProps['children'];
  webProps?: WebPressableProps<T>;
  onPressInProp?: () => void;
  onPressOutProp?: () => void;
}) {
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const events = React.useMemo(() => {
    return {
      onFocus: (ev: any) => {
        setFocused(true);
        webProps?.onFocus?.(ev);
      },
      onBlur: (ev: any) => {
        setFocused(false);
        webProps?.onBlur?.(ev);
      },
      onMouseEnter: (ev: any) => {
        setHovered(true);
        webProps?.onMouseEnter?.(ev);
      },
      onMouseLeave: (ev: any) => {
        setHovered(false);
        webProps?.onMouseLeave?.(ev);
      },
      onMouseDown: (ev: any) => {
        setPressed(true);
        if (webProps?.onMouseDown) {
          webProps.onMouseDown?.(ev);
          return;
        }
        onPressInProp?.();
      },
      onMouseUp: (ev: any) => {
        setPressed(false);
        if (webProps?.onMouseUp) {
          webProps?.onMouseUp?.(ev);
          return;
        }
        onPressOutProp?.();
      },
    };
  }, [
    webProps?.onFocus,
    webProps?.onBlur,
    webProps?.onMouseEnter,
    webProps?.onMouseLeave,
    webProps?.onMouseDown,
    webProps?.onMouseUp,
    onPressInProp,
    onPressOutProp,
  ]);

  const style = React.useMemo(() => {
    if (!styleProp) {
      return;
    }
    return rnStyleToWebStyle(
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
