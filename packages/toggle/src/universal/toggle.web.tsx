import { Pressable } from '@rn-primitives/core';
import { mergeProps } from '@rn-primitives/utils';
import { Root as RootWeb } from '../web';
import type { RootProps } from './types';

const DEFAULT_PRESSABLE_WEB = { as: 'button' } as const;

function Root({
  native: _native,
  web,
  onPressedChange,
  defaultPressed,
  pressed,
  ...props
}: RootProps) {
  return (
    <RootWeb
      asChild
      onPressedChange={onPressedChange}
      defaultPressed={defaultPressed}
      pressed={pressed}
    >
      <Pressable web={mergeProps(DEFAULT_PRESSABLE_WEB, web)} {...props} />
    </RootWeb>
  );
}

export { Root };
