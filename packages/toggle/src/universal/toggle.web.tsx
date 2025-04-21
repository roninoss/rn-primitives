import { Pressable } from '@rn-primitives/core';
import { Root as RootWeb } from '../web';
import type { RootProps } from './types';

function Root({ native: _native, web, ...props }: RootProps) {
  return (
    <RootWeb asChild>
      <Pressable web={{ as: 'button', ...web }} {...props} />
    </RootWeb>
  );
}

export { Root };
