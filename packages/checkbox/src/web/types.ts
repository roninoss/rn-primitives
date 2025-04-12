import type { CheckboxProps, CheckboxIndicatorProps } from '@radix-ui/react-checkbox';

type RootPropsWebOnly = React.ComponentProps<'button'>;

type IndicatorPropsWebOnly = React.ComponentProps<'span'>;

type RootProps = CheckboxProps;

type IndicatorProps = CheckboxIndicatorProps;

export type { IndicatorProps, IndicatorPropsWebOnly, RootProps, RootPropsWebOnly };
