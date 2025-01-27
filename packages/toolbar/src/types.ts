import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr-method/types';

type RootProps = SlottableViewProps & {
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

type ToggleGroupProps = (SingleToggleGroupProps | MultipleToggleGroupProps) & {
  disabled?: boolean;
} & SlottableViewProps;

type ToggleItemProps = SlottablePressableProps & {
  value: string;
};

type SeparatorProps = SlottableViewProps;
type LinkProps = SlottablePressableProps;
type ButtonProps = SlottablePressableProps;

type RootRef = ViewRef;
type LinkRef = PressableRef;
type ButtonRef = PressableRef;
type SeparatorRef = ViewRef;
type ToggleGroupRef = ViewRef;
type ToggleItemRef = PressableRef;

export type {
  ButtonProps,
  ButtonRef,
  LinkProps,
  LinkRef,
  RootProps,
  RootRef,
  SeparatorProps,
  SeparatorRef,
  ToggleGroupProps,
  ToggleGroupRef,
  ToggleItemProps,
  ToggleItemRef,
};
