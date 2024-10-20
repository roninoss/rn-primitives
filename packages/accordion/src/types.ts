import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';

type RootContext = {
  type: 'single' | 'multiple';
  value: (string | undefined) | string[];
  onValueChange: (value: string | undefined) => void | ((value: string[]) => void);
  collapsible: boolean;
  disabled?: boolean;
};

type SingleRootProps = {
  type: 'single';
  defaultValue?: string | undefined;
  value?: string | undefined;
  onValueChange?: (value: string | undefined) => void;
};

type MultipleRootProps = {
  type: 'multiple';
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

type RootProps = (SingleRootProps | MultipleRootProps) & {
  defaultValue?: string | string[];
  disabled?: boolean;
  collapsible?: boolean;
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  orientation?: 'vertical' | 'horizontal';
} & SlottableViewProps;

type RootRef = ViewRef;

type ItemProps = {
  value: string;
  disabled?: boolean;
} & SlottableViewProps;

type ItemRef = ViewRef;

type ContentProps = ForceMountable & SlottableViewProps;
type ContentRef = ViewRef;
type HeaderProps = SlottableViewProps;
type HeaderRef = ViewRef;
type TriggerProps = SlottablePressableProps;
type TriggerRef = PressableRef;

export type {
  ContentProps,
  ContentRef,
  HeaderProps,
  HeaderRef,
  ItemProps,
  ItemRef,
  RootContext,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
