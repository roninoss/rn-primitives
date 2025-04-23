import { Pressable } from '@rn-primitives/core';
import { Root as RootWeb } from '../web';
import type { RootProps } from './types';

function Root({ native: _native, web, style, ...props }: RootProps) {
  if (style) {
    return (
      <Pressable style={style} asChild>
        <RootWeb {...props} {...(web as any)} />
      </Pressable>
    );
  }
  return <RootWeb {...props} {...(web as any)} />;
}

export { Root };
