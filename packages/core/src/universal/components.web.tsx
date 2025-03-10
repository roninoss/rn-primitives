'use client';

import { useAugmentedRef } from '@rn-primitives/hooks';
import { useWebPressableProps } from '@rn-primitives/utils';
import * as React from 'react';
import {
  Image as ImageWeb,
  Pressable as PressableWeb,
  type Role,
  Text as TextWeb,
  View as ViewWeb,
} from '../web';
import type { ImageProps, PressableProps, PressableRef, TextProps, ViewProps } from './types';

function Image({ web, native: _native, style, ...props }: ImageProps) {
  return <ImageWeb {...props} {...web} />;
}

function PressableImpl<T extends Role | undefined>(
  {
    native: _native,
    web: webProps,
    children: childrenProp,
    onPress: onPressProp,
    onPressIn: onPressInProp,
    onPressOut: onPressOutProp,
    style: styleProp,
    ...props
  }: PressableProps<T>,
  ref: React.Ref<PressableRef>
) {
  const methods = React.useMemo(() => {
    return {
      press: () => {
        onPressProp?.();
      },
    };
  }, [onPressProp]);
  const augmentedRef = useAugmentedRef({ ref, methods });
  const { children, events, style } = useWebPressableProps({
    styleProp,
    childrenProp,
    webProps,
    onPressInProp,
    onPressOutProp,
  });

  return (
    <PressableWeb
      ref={augmentedRef as any}
      children={children}
      style={style}
      onClick={onPressProp}
      {...props}
      {...webProps}
      {...events}
    />
  );
}

const Pressable = React.forwardRef(PressableImpl) as <T extends Role | undefined>(
  props: PressableProps<T> & { ref?: React.Ref<PressableRef> }
) => JSX.Element;

function Text<T extends Role | undefined>({ web, native: _native, style, ...props }: TextProps<T>) {
  return <TextWeb {...props} {...web} />;
}

function View<T extends Role | undefined>({ web, native: _native, style, ...props }: ViewProps<T>) {
  return <ViewWeb {...props} {...web} />;
}

export { Image, Pressable, Text, View };
