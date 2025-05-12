import type { Root } from '@radix-ui/react-label';

type RootProps = { children: React.ReactNode; tabIndex?: number };
type RootPropsWebOnly = React.ComponentProps<'div'>;

type TextProps = React.ComponentProps<typeof Root>;
type TextPropsWebOnly = React.ComponentProps<'label'>;

export type { RootProps, RootPropsWebOnly, TextProps, TextPropsWebOnly };
