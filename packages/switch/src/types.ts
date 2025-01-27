import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr-method/types';

type RootProps = SlottablePressableProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  /**
   * Platform: WEB ONLY
   */
  onKeyDown?: (ev: React.KeyboardEvent) => void;
};

type ThumbProps = SlottableViewProps;

type RootRef = PressableRef;
type ThumbRef = ViewRef;

export type { RootProps, RootRef, ThumbProps, ThumbRef };
