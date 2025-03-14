import * as React from 'react';
import type { PressableProps } from 'react-native';
import { rnStyleToWebStyle } from './style/rn-style-to-web-style';

type Element = keyof HTMLElementTagNameMap;

type WebPressableProps<T extends keyof HTMLElementTagNameMap> = Pick<
  React.ComponentPropsWithoutRef<T>,
  'onMouseDown' | 'onMouseUp' | 'onTouchStart' | 'onTouchEnd'
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
  const [pressed, setPressed] = React.useState(false);

  const events = React.useMemo(() => {
    return {
      onTouchStart: (ev: any) => {
        setPressed(true);
        if (webProps?.onTouchStart) {
          webProps.onTouchStart?.(ev);
          return;
        }
        onPressInProp?.();
      },
      onTouchEnd: (ev: any) => {
        setPressed(false);
        if (webProps?.onTouchEnd) {
          webProps?.onTouchEnd?.(ev);
          return;
        }
        onPressOutProp?.();
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
    webProps?.onTouchStart,
    webProps?.onTouchEnd,
    webProps?.onMouseDown,
    webProps?.onMouseUp,
    onPressInProp,
    onPressOutProp,
  ]);

  const style = React.useMemo(() => {
    if (!styleProp) {
      return;
    }
    return rnStyleToWebStyle(typeof styleProp === 'function' ? styleProp({ pressed }) : styleProp);
  }, [styleProp, pressed]);

  return {
    style,
    events,
    children: typeof childrenProp === 'function' ? childrenProp({ pressed }) : childrenProp,
  };
}
