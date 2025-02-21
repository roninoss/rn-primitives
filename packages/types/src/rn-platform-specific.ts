// TODO: adjust `filter` typing when react-native updated https://reactnative.dev/docs/view-style-props#filter

// ViewStyle
type AndroidOnlyViewStyleKeys = 'elevation';

type IosOnlyViewStyleKeys = 'borderCurve' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius';

// ViewProps
type AndroidOnlyViewPropKeys =
  | 'accessibilityLiveRegion'
  | 'aria-labelledby'
  | 'aria-live'
  | 'focusable'
  | 'importantForAccessibility'
  // TODO: adjust when react-native updated https://reactnative.dev/docs/view#nextfocusdown-android
  // | 'nextFocusDown'
  // | 'nextFocusForward'
  // | 'nextFocusLeft'
  // | 'nextFocusRight'
  // | 'nextFocusUp'
  | 'renderToHardwareTextureAndroid'
  | 'tabIndex';

type RemoveAndroidOnlyViewProps<T extends { style?: any }> = Omit<T, AndroidOnlyViewPropKeys> & {
  style?: Omit<T['style'], AndroidOnlyViewStyleKeys>;
};

type IosOnlyViewPropKeys =
  | 'accessibilityElementsHidden'
  | 'accessibilityLanguage'
  | 'accessibilityIgnoresInvertColors'
  | 'accessibilityViewIsModal'
  | 'aria-modal'
  | 'onAccessibilityEscape'
  | 'onMagicTap'
  | 'shouldRasterizeIOS';

type RemoveIosOnlyViewProps<T extends { style?: any }> = Omit<T, IosOnlyViewPropKeys> & {
  style?: Omit<T['style'], IosOnlyViewStyleKeys>;
};

// TextStyle
type AndroidOnlyTextStyleKeys = 'includeFontPadding' | 'textAlignVertical' | 'verticalAlign';
type IosOnlyTextStyleKeys = 'textDecorationColor' | 'textDecorationStyle' | 'writingDirection';

// TextProps
type AndroidOnlyTextPropKeys =
  | 'android_hyphenationFrequency'
  | 'dataDetectorType'
  | 'disabled'
  | 'selectionColor'
  | 'textBreakStrategy';

type RemoveAndroidOnlyTextProps<T extends { style?: any }> = Omit<T, AndroidOnlyTextPropKeys> & {
  style?: Omit<T['style'], AndroidOnlyTextStyleKeys>;
};

type IosOnlyTextPropKeys =
  | 'accessibilityLanguage'
  | 'dynamicTypeRamp'
  | 'minimumFontScale'
  | 'suppressHighlighting'
  | 'lineBreakStrategyIOS';

type RemoveIosOnlyTextProps<T extends { style?: any }> = Omit<T, IosOnlyTextPropKeys> & {
  style?: Omit<T['style'], IosOnlyTextStyleKeys>;
};

// ImageStyle
type AndroidOnlyImageStyleKeys = 'overlayColor';
type IosOnlyImageStyleKeys = never;

// ImageProps
type AndroidOnlyImagePropKeys = 'fadeDuration' | 'progressiveRenderingEnabled' | 'resizeMethod';
// TODO: adjust when react-native updated https://reactnative.dev/docs/image#resizemultiplier-android
// | 'resizeMultiplier';

type RemoveAndroidOnlyImageProps<T extends { style?: any }> = Omit<T, AndroidOnlyImagePropKeys> & {
  style?: Omit<T['style'], AndroidOnlyImageStyleKeys>;
};

type IosOnlyImagePropKeys = 'capInsets' | 'onPartialLoad';

type RemoveIosOnlyImageProps<T extends { style?: any }> = Omit<T, IosOnlyImagePropKeys> & {
  style?: Omit<T['style'], IosOnlyImageStyleKeys>;
};

export type {
  AndroidOnlyImagePropKeys,
  AndroidOnlyImageStyleKeys,
  AndroidOnlyTextPropKeys,
  AndroidOnlyTextStyleKeys,
  AndroidOnlyViewPropKeys,
  AndroidOnlyViewStyleKeys,
  IosOnlyImagePropKeys,
  IosOnlyImageStyleKeys,
  IosOnlyTextPropKeys,
  IosOnlyTextStyleKeys,
  IosOnlyViewPropKeys,
  IosOnlyViewStyleKeys,
  RemoveAndroidOnlyImageProps,
  RemoveAndroidOnlyTextProps,
  RemoveAndroidOnlyViewProps,
  RemoveIosOnlyImageProps,
  RemoveIosOnlyTextProps,
  RemoveIosOnlyViewProps,
};
