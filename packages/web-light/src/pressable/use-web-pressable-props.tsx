import * as React from 'react';
import type { PressableProps, PressableStateCallbackType } from 'react-native';
import { rnStyleToWebStyle } from '../style/rn-style-to-web-style';

type WebPressableProps = Pick<
  React.ComponentPropsWithoutRef<'button'>,
  'onFocus' | 'onBlur' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseDown' | 'onMouseUp'
>;

export function useWebPressableProps({
  childrenProp,
  styleProp,
  webProps,
  onPressInProp,
  onPressOutProp,
}: {
  styleProp: PressableProps['style'];
  childrenProp: PressableProps['children'];
  webProps?: WebPressableProps;
  onPressInProp?: () => void;
  onPressOutProp?: () => void;
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
        onPressInProp?.();
      },
      onMouseUp: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
