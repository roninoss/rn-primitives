import type {
  ToggleGroupItemProps,
  ToggleGroupMultipleProps as MultipleProps,
  ToggleGroupSingleProps as SingleProps,
  Root,
} from '@radix-ui/react-toggle-group';

type RootProps = React.ComponentProps<typeof Root>;
type RootPropsWebOnly = React.ComponentProps<'div'> &
  Pick<RootProps, 'rovingFocus' | 'orientation' | 'dir' | 'loop'>;

type ItemProps = ToggleGroupItemProps;
type ItemPropsWebOnly = React.ComponentProps<'button'>;

export type {
  ItemProps,
  ItemPropsWebOnly,
  RootProps,
  RootPropsWebOnly,
  MultipleProps,
  SingleProps,
};
