import type { SlottablePressableProps } from '@rn-primitives/types';

type ToggleRootProps = SlottablePressableProps & {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  disabled?: boolean;
};

export type { ToggleRootProps };
