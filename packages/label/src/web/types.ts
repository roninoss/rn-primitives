import type { Root } from '@radix-ui/react-label';
import type { PressableProps } from '@rn-primitives/core/dist/web';
import type { BaseRootProps, BaseTextProps } from '../base-types';

type RootProps = BaseRootProps & PressableProps<'div'>;
type RootPropsWebOnly = { tabIndex?: number } & PressableProps<'div'>;

type TextProps = BaseTextProps & React.ComponentProps<typeof Root>;
type TextPropsWebOnly = React.ComponentProps<typeof Root>;

export type { RootProps, RootPropsWebOnly, TextProps, TextPropsWebOnly };
