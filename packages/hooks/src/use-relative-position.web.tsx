import type { Insets } from '@rn-primitives/types';
import type { LayoutRectangle, ScaledSize } from 'react-native';

type UseRelativePositionArgs = Omit<
  GetContentStyleArgs,
  'triggerPosition' | 'contentLayout' | 'dimensions'
> & {
  triggerPosition: LayoutPosition | null;
  contentLayout: LayoutRectangle | null;
  disablePositioningStyle?: boolean;
};

// TODO(zach): this prevents from importing react-native on web - should be dealt with after useRelativePosition's TODO is done
export function useRelativePosition(_args: UseRelativePositionArgs) {
  return {};
}

interface LayoutPosition {
  pageY: number;
  pageX: number;
  width: number;
  height: number;
}

interface GetPositionArgs {
  dimensions: ScaledSize;
  avoidCollisions: boolean;
  triggerPosition: LayoutPosition;
  contentLayout: LayoutRectangle;
  insets?: Insets;
}

interface GetSidePositionArgs extends GetPositionArgs {
  side: 'top' | 'bottom';
  sideOffset: number;
}

interface GetAlignPositionArgs extends GetPositionArgs {
  align: 'start' | 'center' | 'end';
  alignOffset: number;
}

type GetContentStyleArgs = GetPositionArgs & GetSidePositionArgs & GetAlignPositionArgs;
