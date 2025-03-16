'use client';

import { rnStyleToWebStyle, useWebPressableProps } from '@rn-primitives/utils';
import * as React from 'react';
import {
  Image as ImageWeb,
  Pressable as PressableWeb,
  Text as TextWeb,
  View as ViewWeb,
  type ElementTag,
} from '../web';
import type { ImageProps, PressableProps, PressableRef, TextProps, ViewProps } from './types';

function ImageWithStyle({ web, native: _native, style: styleProp, ...props }: ImageProps) {
  const style = React.useMemo(() => rnStyleToWebStyle(styleProp), [styleProp]);
  return <ImageWeb {...props} style={style} {...web} />;
}

function Image({ web, native: _native, style, ...props }: ImageProps) {
  if (style) {
    return <ImageWithStyle style={style} {...props} web={web} />;
  }
  return <ImageWeb {...props} {...web} />;
}

function Pressable<T extends ElementTag>({
  native: _native,
  web: webProps,
  children: childrenProp,
  onPress: onPressProp,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  style: styleProp,
  ref,
  ...props
}: PressableProps<T>) {
  const augmentedRef = React.useRef<HTMLElementTagNameMap[T]>(null);
  React.useImperativeHandle(
    ref,
    () => {
      if (!augmentedRef.current) return null as unknown as PressableRef;

      return Object.assign(augmentedRef.current, {
        press: () => {
          augmentedRef.current?.click();
        },
      });
    },
    [augmentedRef.current]
  );

  const { children, events, style } = useWebPressableProps({
    styleProp,
    childrenProp,
    webProps,
    onPressInProp,
    onPressOutProp,
  });

  return (
    <PressableWeb
      ref={augmentedRef}
      children={children}
      style={style}
      onClick={onPressProp}
      {...props}
      {...(webProps as PressableProps<ElementTag>['web'])}
      {...events}
    />
  );
}

function TextWithStyle<T extends ElementTag>({
  web,
  native: _native,
  style: styleProp,
  ...props
}: TextProps<T>) {
  const style = React.useMemo(() => rnStyleToWebStyle(styleProp), [styleProp]);
  return <TextWeb {...props} style={style} {...(web as TextProps<ElementTag>['web'])} />;
}

function Text<T extends ElementTag>({ web, native: _native, style, ...props }: TextProps<T>) {
  if (style) {
    return <TextWithStyle style={style} {...props} web={web} />;
  }
  return <TextWeb {...props} {...(web as TextProps<ElementTag>['web'])} />;
}

function ViewWithStyle<T extends ElementTag>({
  web,
  native: _native,
  style: styleProp,
  ...props
}: ViewProps<T>) {
  const style = React.useMemo(() => rnStyleToWebStyle(styleProp), [styleProp]);
  return <ViewWeb {...props} style={style} {...(web as ViewProps<ElementTag>['web'])} />;
}

function View<T extends ElementTag>({ web, native: _native, style, ...props }: ViewProps<T>) {
  if (style) {
    return <ViewWithStyle style={style} {...props} web={web} />;
  }
  return <ViewWeb {...props} {...(web as ViewProps<ElementTag>['web'])} />;
}

export { Image, Pressable, Text, View };
