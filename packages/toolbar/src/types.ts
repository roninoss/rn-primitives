import type { SlottablePressableProps, SlottableViewProps } from '@rn-primitives/types';

type ToolbarRootProps = SlottableViewProps & {
  /**
   * Platform: WEB ONLY
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  loop?: boolean;
};

type SingleToggleGroupProps = {
  type: 'single';
  value: string | undefined;
  onValueChange: (val: string | undefined) => void;
};

type MultipleToggleGroupProps = {
  type: 'multiple';
  value: string[];
  onValueChange: (val: string[]) => void;
};

type ToolbarToggleGroupProps = (SingleToggleGroupProps | MultipleToggleGroupProps) & {
  disabled?: boolean;
} & SlottableViewProps;

type ToolbarToggleItem = SlottablePressableProps & {
  value: string;
};

type ToolbarSeparatorProps = SlottableViewProps;
type ToolbarLinkProps = SlottablePressableProps;
type ToolbarButtonProps = SlottablePressableProps;

export type {
  ToolbarButtonProps,
  ToolbarLinkProps,
  ToolbarRootProps,
  ToolbarSeparatorProps,
  ToolbarToggleGroupProps,
  ToolbarToggleItem,
};
