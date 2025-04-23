import type { Root, Indicator } from '@radix-ui/react-progress';

type RootProps = React.ComponentProps<typeof Root>;

type RootPropsWebOnly = React.ComponentProps<'div'>;

type IndicatorProps = React.ComponentProps<typeof Indicator>;

type IndicatorPropsWebOnly = React.ComponentProps<'div'>;

export type { RootProps, RootPropsWebOnly, IndicatorProps, IndicatorPropsWebOnly };
