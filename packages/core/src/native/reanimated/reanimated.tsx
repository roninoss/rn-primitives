'use client';

import React from 'react';

import type {
  BounceIn as BounceInType,
  BounceInDown as BounceInDownType,
  BounceInLeft as BounceInLeftType,
  BounceInRight as BounceInRightType,
  BounceInUp as BounceInUpType,
  BounceOut as BounceOutType,
  BounceOutDown as BounceOutDownType,
  BounceOutLeft as BounceOutLeftType,
  BounceOutRight as BounceOutRightType,
  BounceOutUp as BounceOutUpType,
  CurvedTransition as CurvedTransitionType,
  EntryExitTransition as EntryExitTransitionType,
  FadeIn as FadeInType,
  FadeInDown as FadeInDownType,
  FadeInLeft as FadeInLeftType,
  FadeInRight as FadeInRightType,
  FadeInUp as FadeInUpType,
  FadeOut as FadeOutType,
  FadeOutDown as FadeOutDownType,
  FadeOutLeft as FadeOutLeftType,
  FadeOutRight as FadeOutRightType,
  FadeOutUp as FadeOutUpType,
  FadingTransition as FadingTransitionType,
  FlipInEasyX as FlipInEasyXType,
  FlipInEasyY as FlipInEasyYType,
  FlipInXDown as FlipInXDownType,
  FlipInXUp as FlipInXUpType,
  FlipInYLeft as FlipInYLeftType,
  FlipInYRight as FlipInYRightType,
  FlipOutEasyX as FlipOutEasyXType,
  FlipOutEasyY as FlipOutEasyYType,
  FlipOutXDown as FlipOutXDownType,
  FlipOutXUp as FlipOutXUpType,
  FlipOutYLeft as FlipOutYLeftType,
  FlipOutYRight as FlipOutYRightType,
  JumpingTransition as JumpingTransitionType,
  LayoutAnimationConfig as LayoutAnimationConfigType,
  LightSpeedInLeft as LightSpeedInLeftType,
  LightSpeedInRight as LightSpeedInRightType,
  LightSpeedOutLeft as LightSpeedOutLeftType,
  LightSpeedOutRight as LightSpeedOutRightType,
  LinearTransition as LinearTransitionType,
  PinwheelIn as PinwheelInType,
  PinwheelOut as PinwheelOutType,
  ReducedMotionConfig as ReducedMotionConfigType,
  RollInLeft as RollInLeftType,
  RollInRight as RollInRightType,
  RollOutLeft as RollOutLeftType,
  RollOutRight as RollOutRightType,
  RotateInDownLeft as RotateInDownLeftType,
  RotateInDownRight as RotateInDownRightType,
  RotateInUpLeft as RotateInUpLeftType,
  RotateInUpRight as RotateInUpRightType,
  RotateOutDownLeft as RotateOutDownLeftType,
  RotateOutDownRight as RotateOutDownRightType,
  RotateOutUpLeft as RotateOutUpLeftType,
  RotateOutUpRight as RotateOutUpRightType,
  SequencedTransition as SequencedTransitionType,
  SlideInDown as SlideInDownType,
  SlideInLeft as SlideInLeftType,
  SlideInRight as SlideInRightType,
  SlideInUp as SlideInUpType,
  SlideOutDown as SlideOutDownType,
  SlideOutLeft as SlideOutLeftType,
  SlideOutRight as SlideOutRightType,
  SlideOutUp as SlideOutUpType,
  StretchInX as StretchInXType,
  StretchInY as StretchInYType,
  StretchOutX as StretchOutXType,
  StretchOutY as StretchOutYType,
  ZoomIn as ZoomInType,
  ZoomOut as ZoomOutType,
  ZoomInDown as ZoomInDownType,
  ZoomInEasyDown as ZoomInEasyDownType,
  ZoomInEasyUp as ZoomInEasyUpType,
  ZoomInLeft as ZoomInLeftType,
  ZoomInRight as ZoomInRightType,
  ZoomInRotate as ZoomInRotateType,
  ZoomInUp as ZoomInUpType,
  ZoomOutDown as ZoomOutDownType,
  ZoomOutEasyDown as ZoomOutEasyDownType,
  ZoomOutEasyUp as ZoomOutEasyUpType,
  ZoomOutLeft as ZoomOutLeftType,
  ZoomOutRight as ZoomOutRightType,
  ZoomOutUp as ZoomOutUpType,
  ZoomOutRotate as ZoomOutRotateType,
} from 'react-native-reanimated';

function createNoopProxy<T>(): T {
  const noopProxy: any = new Proxy(() => noopProxy, {
    get: () => noopProxy,
    apply: () => noopProxy,
  });
  return noopProxy as T;
}

export const BounceIn = createNoopProxy<BounceInType>();
export const BounceInDown = createNoopProxy<BounceInDownType>();
export const BounceInLeft = createNoopProxy<BounceInLeftType>();
export const BounceInRight = createNoopProxy<BounceInRightType>();
export const BounceInUp = createNoopProxy<BounceInUpType>();
export const BounceOut = createNoopProxy<BounceOutType>();
export const BounceOutDown = createNoopProxy<BounceOutDownType>();
export const BounceOutLeft = createNoopProxy<BounceOutLeftType>();
export const BounceOutRight = createNoopProxy<BounceOutRightType>();
export const BounceOutUp = createNoopProxy<BounceOutUpType>();
export const CurvedTransition = createNoopProxy<CurvedTransitionType>();
export const EntryExitTransition = createNoopProxy<EntryExitTransitionType>();
export const FadeIn = createNoopProxy<FadeInType>();
export const FadeInDown = createNoopProxy<FadeInDownType>();
export const FadeInLeft = createNoopProxy<FadeInLeftType>();
export const FadeInRight = createNoopProxy<FadeInRightType>();
export const FadeInUp = createNoopProxy<FadeInUpType>();
export const FadeOut = createNoopProxy<FadeOutType>();
export const FadeOutDown = createNoopProxy<FadeOutDownType>();
export const FadeOutLeft = createNoopProxy<FadeOutLeftType>();
export const FadeOutRight = createNoopProxy<FadeOutRightType>();
export const FadeOutUp = createNoopProxy<FadeOutUpType>();
export const FadingTransition = createNoopProxy<FadingTransitionType>();
export const FlipInEasyX = createNoopProxy<FlipInEasyXType>();
export const FlipInEasyY = createNoopProxy<FlipInEasyYType>();
export const FlipInXDown = createNoopProxy<FlipInXDownType>();
export const FlipInXUp = createNoopProxy<FlipInXUpType>();
export const FlipInYLeft = createNoopProxy<FlipInYLeftType>();
export const FlipInYRight = createNoopProxy<FlipInYRightType>();
export const FlipOutEasyX = createNoopProxy<FlipOutEasyXType>();
export const FlipOutEasyY = createNoopProxy<FlipOutEasyYType>();
export const FlipOutXDown = createNoopProxy<FlipOutXDownType>();
export const FlipOutXUp = createNoopProxy<FlipOutXUpType>();
export const FlipOutYLeft = createNoopProxy<FlipOutYLeftType>();
export const FlipOutYRight = createNoopProxy<FlipOutYRightType>();
export const JumpingTransition = createNoopProxy<JumpingTransitionType>();
export const LightSpeedInLeft = createNoopProxy<LightSpeedInLeftType>();
export const LightSpeedInRight = createNoopProxy<LightSpeedInRightType>();
export const LightSpeedOutLeft = createNoopProxy<LightSpeedOutLeftType>();
export const LightSpeedOutRight = createNoopProxy<LightSpeedOutRightType>();
export const LinearTransition = createNoopProxy<LinearTransitionType>();
export const PinwheelIn = createNoopProxy<PinwheelInType>();
export const PinwheelOut = createNoopProxy<PinwheelOutType>();
export const RollInLeft = createNoopProxy<RollInLeftType>();
export const RollInRight = createNoopProxy<RollInRightType>();
export const RollOutLeft = createNoopProxy<RollOutLeftType>();
export const RollOutRight = createNoopProxy<RollOutRightType>();
export const RotateInDownLeft = createNoopProxy<RotateInDownLeftType>();
export const RotateInDownRight = createNoopProxy<RotateInDownRightType>();
export const RotateInUpLeft = createNoopProxy<RotateInUpLeftType>();
export const RotateInUpRight = createNoopProxy<RotateInUpRightType>();
export const RotateOutDownLeft = createNoopProxy<RotateOutDownLeftType>();
export const RotateOutDownRight = createNoopProxy<RotateOutDownRightType>();
export const RotateOutUpLeft = createNoopProxy<RotateOutUpLeftType>();
export const RotateOutUpRight = createNoopProxy<RotateOutUpRightType>();
export const SequencedTransition = createNoopProxy<SequencedTransitionType>();
export const SlideInDown = createNoopProxy<SlideInDownType>();
export const SlideInLeft = createNoopProxy<SlideInLeftType>();
export const SlideInRight = createNoopProxy<SlideInRightType>();
export const SlideInUp = createNoopProxy<SlideInUpType>();
export const SlideOutDown = createNoopProxy<SlideOutDownType>();
export const SlideOutLeft = createNoopProxy<SlideOutLeftType>();
export const SlideOutRight = createNoopProxy<SlideOutRightType>();
export const SlideOutUp = createNoopProxy<SlideOutUpType>();
export const StretchInX = createNoopProxy<StretchInXType>();
export const StretchInY = createNoopProxy<StretchInYType>();
export const StretchOutX = createNoopProxy<StretchOutXType>();
export const StretchOutY = createNoopProxy<StretchOutYType>();
export const ZoomIn = createNoopProxy<ZoomInType>();
export const ZoomOut = createNoopProxy<ZoomOutType>();
export const ZoomInDown = createNoopProxy<ZoomInDownType>();
export const ZoomInEasyDown = createNoopProxy<ZoomInEasyDownType>();
export const ZoomInEasyUp = createNoopProxy<ZoomInEasyUpType>();
export const ZoomInLeft = createNoopProxy<ZoomInLeftType>();
export const ZoomInRight = createNoopProxy<ZoomInRightType>();
export const ZoomInRotate = createNoopProxy<ZoomInRotateType>();
export const ZoomInUp = createNoopProxy<ZoomInUpType>();
export const ZoomOutDown = createNoopProxy<ZoomOutDownType>();
export const ZoomOutEasyDown = createNoopProxy<ZoomOutEasyDownType>();
export const ZoomOutEasyUp = createNoopProxy<ZoomOutEasyUpType>();
export const ZoomOutLeft = createNoopProxy<ZoomOutLeftType>();
export const ZoomOutRight = createNoopProxy<ZoomOutRightType>();
export const ZoomOutUp = createNoopProxy<ZoomOutUpType>();
export const ZoomOutRotate = createNoopProxy<ZoomOutRotateType>();

export function LayoutAnimationConfig({
  children,
}: React.ComponentPropsWithoutRef<typeof LayoutAnimationConfigType>) {
  return <>{children}</>;
}

export function ReducedMotionConfig(
  _props: React.ComponentPropsWithoutRef<typeof ReducedMotionConfigType>
) {
  return null;
}

export enum ReduceMotion {
  System = 'system',
  Always = 'always',
  Never = 'never',
}
