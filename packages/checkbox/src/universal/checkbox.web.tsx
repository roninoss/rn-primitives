import { Pressable, View } from '@rn-primitives/core';
import { Indicator as IndicatorWeb, Root as RootWeb } from '../web';
import { mergeProps } from '@rn-primitives/utils';
import type { IndicatorProps, RootProps } from './types';

const DEFAULT_PRESSABLE_WEB = { as: 'button' } as const;

function Root({
  web,
  native: _native,
  defaultChecked,
  checked,
  onCheckedChange,
  ...props
}: RootProps) {
  return (
    <RootWeb
      asChild
      defaultChecked={defaultChecked}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <Pressable web={mergeProps(DEFAULT_PRESSABLE_WEB, web)} {...props} />
    </RootWeb>
  );
}

function Indicator({ web, native: _native, style, ...props }: IndicatorProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <IndicatorWeb {...props} {...web} />
      </View>
    );
  }

  return <IndicatorWeb {...props} {...web} />;
}

export { Indicator, Root };
