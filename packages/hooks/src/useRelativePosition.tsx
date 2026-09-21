import type { Insets } from '@rn-primitives/types';
import * as React from 'react';
import { Dimensions, I18nManager, type LayoutRectangle, type ScaledSize } from 'react-native';

const DirectionContext = React.createContext<'ltr' | 'rtl' | undefined>(undefined);

export function DirectionProvider({
  dir,
  children,
}: {
  dir: 'ltr' | 'rtl';
  children: React.ReactNode;
}) {
  return React.createElement(DirectionContext.Provider, { value: dir }, children);
}

export function useDirection(dirProp?: 'ltr' | 'rtl') {
  const contextDir = React.useContext(DirectionContext);
  return dirProp ?? contextDir ?? (I18nManager?.isRTL ? 'rtl' : 'ltr');
}

export type UseRelativePositionArgs = Omit<
  GetContentStyleArgs,
  'triggerPosition' | 'contentLayout' | 'dimensions'
> & {
  triggerPosition: LayoutPosition | null;
  contentLayout: LayoutRectangle | null;
  disablePositioningStyle?: boolean;
  dir?: 'ltr' | 'rtl';
};

export function useRelativePosition({
  align,
  avoidCollisions,
  triggerPosition,
  contentLayout,
  alignOffset,
  insets,
  sideOffset,
  side,
  disablePositioningStyle,
  dir: dirProp,
}: UseRelativePositionArgs) {
  const dimensions = Dimensions.get('screen');
  const dir = useDirection(dirProp);

  return React.useMemo(() => {
    if (disablePositioningStyle) {
      return {};
    }
    if (!triggerPosition || !contentLayout) {
      return {
        position: 'absolute',
        opacity: 0,
        top: dimensions.height,
        zIndex: -9999999,
      } as const;
    }
    return getContentStyle({
      align,
      avoidCollisions,
      contentLayout,
      side,
      triggerPosition,
      alignOffset,
      insets,
      sideOffset,
      dimensions,
      dir,
    });
  }, [
    align,
    avoidCollisions,
    side,
    alignOffset,
    insets,
    sideOffset,
    triggerPosition,
    contentLayout,
    dimensions.width,
    dimensions.height,
    dir,
  ]);
}

export interface LayoutPosition {
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

function getSidePosition({
  side,
  triggerPosition,
  contentLayout,
  sideOffset,
  insets,
  avoidCollisions,
  dimensions,
}: GetSidePositionArgs) {
  const insetTop = insets?.top ?? 0;
  const insetBottom = insets?.bottom ?? 0;
  const positionTop = triggerPosition?.pageY - sideOffset - contentLayout.height;
  const positionBottom = triggerPosition.pageY + triggerPosition.height + sideOffset;

  if (!avoidCollisions) {
    return {
      top: side === 'top' ? positionTop : positionBottom,
    };
  }

  if (side === 'top') {
    return {
      top: Math.min(
        Math.max(insetTop, positionTop),
        dimensions.height - insetBottom - contentLayout.height
      ),
    };
  }

  return {
    top: Math.min(dimensions.height - insetBottom - contentLayout.height, positionBottom),
  };
}

interface GetAlignPositionArgs extends GetPositionArgs {
  align: 'start' | 'center' | 'end';
  alignOffset: number;
  dir?: 'ltr' | 'rtl';
}

function getAlignPosition({
  align,
  avoidCollisions,
  contentLayout,
  triggerPosition,
  alignOffset,
  insets,
  dimensions,
  dir,
}: GetAlignPositionArgs) {
  const insetLeft = insets?.left ?? 0;
  const insetRight = insets?.right ?? 0;
  const maxContentWidth = dimensions.width - insetLeft - insetRight;
  const contentWidth = Math.min(contentLayout.width, maxContentWidth);

  let left = getLeftPosition(
    align,
    triggerPosition.pageX,
    triggerPosition.width,
    contentWidth,
    alignOffset,
    insetLeft,
    insetRight,
    dimensions,
    dir
  );

  if (avoidCollisions) {
    const doesCollide = left < insetLeft || left + contentWidth > dimensions.width - insetRight;
    if (doesCollide) {
      const spaceLeft = left - insetLeft;
      const spaceRight = dimensions.width - insetRight - (left + contentWidth);

      if (spaceLeft > spaceRight && spaceLeft >= contentWidth) {
        left = insetLeft;
      } else if (spaceRight >= contentWidth) {
        left = dimensions.width - insetRight - contentWidth;
      } else {
        const centeredPosition = Math.max(
          insetLeft,
          (dimensions.width - contentWidth - insetRight) / 2
        );
        left = centeredPosition;
      }
    }
  }

  return { left, maxWidth: maxContentWidth };
}

function getLeftPosition(
  align: 'start' | 'center' | 'end',
  triggerPageX: number,
  triggerWidth: number,
  contentWidth: number,
  alignOffset: number,
  insetLeft: number,
  insetRight: number,
  dimensions: ScaledSize,
  dir?: 'ltr' | 'rtl'
) {
  const isRtl = dir === 'rtl';
  let left = 0;

  if (align === 'start') {
    left = isRtl
      ? triggerPageX + triggerWidth - contentWidth - alignOffset
      : triggerPageX + alignOffset;
  } else if (align === 'center') {
    left = isRtl
      ? triggerPageX + (triggerWidth - contentWidth) / 2 - alignOffset
      : triggerPageX + (triggerWidth - contentWidth) / 2 + alignOffset;
  } else if (align === 'end') {
    left = isRtl
      ? triggerPageX + alignOffset
      : triggerPageX + triggerWidth - contentWidth + alignOffset;
  }

  return Math.max(
    insetLeft,
    Math.min(left, dimensions.width - contentWidth - insetRight)
  );
}

type GetContentStyleArgs = GetPositionArgs & GetSidePositionArgs & GetAlignPositionArgs;

function getContentStyle({
  align,
  avoidCollisions,
  contentLayout,
  side,
  triggerPosition,
  alignOffset,
  insets,
  sideOffset,
  dimensions,
  dir,
}: GetContentStyleArgs) {
  return Object.assign(
    { position: 'absolute' } as const,
    getSidePosition({
      side,
      triggerPosition,
      contentLayout,
      sideOffset,
      insets,
      avoidCollisions,
      dimensions,
    }),
    getAlignPosition({
      align,
      avoidCollisions,
      triggerPosition,
      contentLayout,
      alignOffset,
      insets,
      dimensions,
      dir,
    })
  );
}
