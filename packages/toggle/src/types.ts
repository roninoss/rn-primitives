import type { PressableRef, SlottablePressableProps } from '@rnr-method/types';

type RootProps = SlottablePressableProps & {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  disabled?: boolean;
};

type RootRef = PressableRef;

export type { RootProps, RootRef };
