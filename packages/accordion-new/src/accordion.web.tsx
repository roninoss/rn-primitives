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
