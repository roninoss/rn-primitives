import { Image as RNPImage, View } from '@rn-primitives/core';
import { Fallback as FallbackWeb, Image as ImageWeb, Root as RootWeb } from '../web';
import type { FallbackProps, ImageProps, RootProps } from './types';

function Root({ web, native: _native, style, ...props }: RootProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <RootWeb {...props} {...web} />
      </View>
    );
  }

  return <RootWeb {...props} {...web} />;
}

function Fallback({ web, native: _native, style, ...props }: FallbackProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <FallbackWeb {...props} {...web} />
      </View>
    );
  }

  return <FallbackWeb {...props} {...web} />;
}

function Image({ web, native: _native, style, ...props }: ImageProps) {
  if (style) {
    return (
      <RNPImage style={style} asChild>
        <ImageWeb {...props} {...web} />
      </RNPImage>
    );
  }

  return <ImageWeb {...props} {...web} />;
}

export { Fallback, Image, Root };
