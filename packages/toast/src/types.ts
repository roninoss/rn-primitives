import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '@rnr-method/types';

type RootProps = SlottableViewProps & {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  type?: 'foreground' | 'background';
};

type CloseProps = SlottablePressableProps;
type ActionProps = SlottablePressableProps;
type TitleProps = SlottableTextProps;
type DescriptionProps = SlottableTextProps;

type RootRef = ViewRef;
type CloseRef = PressableRef;
type ActionRef = PressableRef;
type TitleRef = TextRef;
type DescriptionRef = TextRef;

export type {
  ActionProps,
  ActionRef,
  CloseProps,
  CloseRef,
  DescriptionProps,
  DescriptionRef,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
};
