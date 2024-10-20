import {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';

type SingleRootProps = {
  type: 'single';
  value: string | undefined;
  onValueChange: (val: string | undefined) => void;
};

type MultipleRootProps = {
  type: 'multiple';
  value: string[];
  onValueChange: (val: string[]) => void;
};

type RootProps = (SingleRootProps | MultipleRootProps) & {
  disabled?: boolean;
  /**
   * Platform: WEB ONLY
   */
  rovingFocus?: boolean;
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
} & SlottableViewProps;

type ItemProps = SlottablePressableProps & {
  value: string;
};

type RootRef = ViewRef;
type ItemRef = PressableRef;

export type { ItemProps, ItemRef, RootProps, RootRef };
