import type {
  ToggleGroupItemProps,
  ToggleGroupMultipleProps,
  ToggleGroupSingleProps,
} from '@radix-ui/react-toggle-group';

type RootProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

type ItemProps = ToggleGroupItemProps;

type RootPropsWebOnly = React.ComponentProps<'div'> &
  Pick<RootProps, 'rovingFocus' | 'orientation' | 'dir' | 'loop'>;

type ItemPropsWebOnly = React.ComponentProps<'button'>;

export type { ItemProps, ItemPropsWebOnly, RootProps, RootPropsWebOnly };
