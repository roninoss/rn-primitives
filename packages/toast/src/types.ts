import type {
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type ToastRootProps = SlottableViewProps & {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  type?: 'foreground' | 'background';
};

type ToastCloseProps = SlottablePressableProps;
type ToastActionProps = SlottablePressableProps;
type ToastTitleProps = SlottableTextProps;
type ToastDescriptionProps = SlottableTextProps;

export type {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastRootProps,
  ToastTitleProps,
};
