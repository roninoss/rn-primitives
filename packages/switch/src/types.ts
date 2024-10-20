import type { SlottablePressableProps, SlottableViewProps } from '@rn-primitives/types';

type SwitchRootProps = SlottablePressableProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  /**
   * Platform: WEB ONLY
   */
  onKeyDown?: (ev: React.KeyboardEvent) => void;
};

type SwitchThumbProps = SlottableViewProps;

export type { SwitchRootProps, SwitchThumbProps };
