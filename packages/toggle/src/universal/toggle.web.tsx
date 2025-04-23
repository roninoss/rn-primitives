import { Pressable } from '@rn-primitives/core';
import { Root as RootWeb } from '../web';
import { mergeProps } from '@rn-primitives/utils';
import type { RootProps } from './types';

const DEFAULT_PRESSABLE_WEB = { as: 'button' } as const;

function Root({
  web,
  native: _native,
  defaultPressed,
  pressed,
  onPressedChange,
  ...props
}: RootProps) {
  return (
    <RootWeb
      asChild
      defaultPressed={defaultPressed}
      pressed={pressed}
      onPressedChange={onPressedChange}
    >
      <Pressable web={mergeProps(DEFAULT_PRESSABLE_WEB, web)} {...props} />
    </RootWeb>
  );
}

export { Root };
