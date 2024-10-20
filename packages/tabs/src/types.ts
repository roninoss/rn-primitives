import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';

type RootProps = SlottableViewProps & {
  value: string;
  onValueChange: (value: string) => void;
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
  activationMode?: 'automatic' | 'manual';
};

type ListProps = SlottableViewProps;
type TriggerProps = SlottablePressableProps & {
  value: string;
};
type ContentProps = SlottableViewProps &
  ForceMountable & {
    value: string;
  };

type RootRef = ViewRef;
type ListRef = ViewRef;
type TriggerRef = PressableRef;
type ContentRef = ViewRef;

export type {
  ContentProps,
  ContentRef,
  ListProps,
  ListRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
