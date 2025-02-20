import type {
  Image,
  ImageProps,
  ImageStyle,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

// ViewStyle
type AndroidOnlyViewStyleKeys = 'elevation' | 'dropShadow';
type AndroidOnlyViewStyleFilterKeys =
  | 'blur'
  | 'contrast'
  | 'dropShadow'
  | 'grayscale'
  | 'hueRotate'
  | 'invert'
  | 'sepia'
  | 'saturate';

type IosOnlyViewStyleKeys = 'borderCurve' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius';
type IosViewStyleFilterKeys = Omit<ViewStyle['filter'], AndroidOnlyViewStyleFilterKeys>;

type ViewStyleAndroid = Omit<ViewStyle, IosOnlyViewStyleKeys>;
type ViewStyleIos = Omit<ViewStyle, AndroidOnlyViewStyleKeys | 'filter'> & {
  filter: IosViewStyleFilterKeys;
};

// ViewProps
type AndroidOnlyViewProps =
  | 'accessibilityLiveRegion'
  | 'aria-labelledby'
  | 'aria-live'
  | 'focusable'
  | 'importantForAccessibility'
  | 'nextFocusDown'
  | 'nextFocusForward'
  | 'nextFocusLeft'
  | 'nextFocusRight'
  | 'nextFocusUp'
  | 'renderToHardwareTextureAndroid'
  | 'tabIndex';

type IosOnlyViewProps =
  | 'accessibilityElementsHidden'
  | 'accessibilityLanguage'
  | 'accessibilityIgnoresInvertColors'
  | 'accessibilityViewIsModal'
  | 'aria-modal'
  | 'onAccessibilityEscape'
  | 'onMagicTap'
  | 'shouldRasterizeIOS';

type ViewPropsAndroid = Prettify<
  PropsWithout<ViewProps, IosOnlyViewProps | 'style'> & { style?: ViewStyleAndroid }
>;
type ViewPropsIos = Prettify<
  PropsWithout<ViewProps, AndroidOnlyViewProps | 'style'> & { style?: ViewStyleIos }
>;

// TextStyle
type AndroidOnlyTextStyleKeys = 'includeFontPadding' | 'textAlignVertical' | 'verticalAlign';

type IosOnlyTextStyleKeys = 'textDecorationColor' | 'textDecorationStyle' | 'writingDirection';

type TextStyleAndroid = Omit<TextStyle, IosOnlyTextStyleKeys>;
type TextStyleIos = Omit<TextStyle, AndroidOnlyTextStyleKeys>;

// TextProps
type AndroidOnlyTextProps =
  | 'android_hyphenationFrequency'
  | 'dataDetectorType'
  | 'disabled'
  | 'selectionColor'
  | 'textBreakStrategy';

type IosOnlyTextProps =
  | 'accessibilityLanguage'
  | 'dynamicTypeRamp'
  | 'minimumFontScale'
  | 'suppressHighlighting'
  | 'lineBreakStrategyIOS';

type TextPropsAndroid = Prettify<
  PropsWithout<TextProps, IosOnlyTextProps | 'style'> & { style?: TextStyleAndroid }
>;
type TextPropsIos = Prettify<
  PropsWithout<TextProps, AndroidOnlyTextProps | 'style'> & { style?: TextStyleIos }
>;

// ImageStyle
type AndroidOnlyImageStyleKeys = 'overlayColor';

type ImageStyleAndroid = ImageStyle;
type ImageStyleIos = Omit<ImageStyle, AndroidOnlyImageStyleKeys>;

// ImageProps
type AndroidOnlyImageProps =
  | 'fadeDuration'
  | 'progressiveRenderingEnabled'
  | 'resizeMethod'
  | 'resizeMultiplier';

type IosOnlyImageProps = 'capInsets' | 'onPartialLoad';

type ImagePropsAndroid = Prettify<
  PropsWithout<ImageProps, IosOnlyImageProps | 'style'> & { style?: ImageStyleAndroid }
>;
type ImagePropsIos = Prettify<
  PropsWithout<ImageProps, AndroidOnlyImageProps | 'style'> & { style?: ImageStyleIos }
>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type PropsWithout<T, U> = Omit<T, keyof U>;
type PropsWithoutHTML<T, U> = PropsWithout<T, React.HTMLAttributes<U>>;

type Slottable<T> = Prettify<T & { asChild?: boolean }>;

type SlottableViewProps = Slottable<ViewProps>;

// TODO: remove the web only props
type SlottablePressableProps = Slottable<PressableProps> & {
  /**
   * Platform: WEB ONLY
   */
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  /**
   * Platform: WEB ONLY
   */
  onKeyUp?: (ev: React.KeyboardEvent) => void;
};
type SlottableTextProps = Slottable<TextProps>;
type SlottableImageProps = Slottable<ImageProps>;

type BaseSlottableTextProps = Slottable<{
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
}>;
type BaseSlottableViewProps = Slottable<{
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}>;
type BaseSlottablePressableProps = Slottable<{
  children?: PressableProps['children'];
  style?: PressableProps['style'];
  className?: string;
}>;
type BaseSlottableImageProps = Slottable<{
  style?: StyleProp<ImageStyle>;
  className?: string;
}>;

type ViewRef = React.ElementRef<typeof View>;
type PressableRef = React.ElementRef<typeof Pressable>;
type TextRef = React.ElementRef<typeof Text>;
type ImageRef = React.ElementRef<typeof Image>;

type BasicPressEvents = {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

interface Insets {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;
type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

/**
 * Certain props are only available on the native version of the component.
 * @docs For the web version, see the Radix documentation https://www.radix-ui.com/primitives
 */
interface PositionedContentProps {
  forceMount?: true | undefined;
  style?: ViewStyle;
  alignOffset?: number;
  insets?: Insets;
  avoidCollisions?: boolean;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  sideOffset?: number;
  /**
   * Platform: NATIVE ONLY
   */
  disablePositioningStyle?: boolean;
  /**
   * Platform: WEB ONLY
   */
  loop?: boolean;
  /**
   * Platform: WEB ONLY
   */
  onCloseAutoFocus?: (event: Event) => void;
  /**
   * Platform: WEB ONLY
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /**
   * Platform: WEB ONLY
   */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  /**
   * Platform: WEB ONLY
   */
  onFocusOutside?: (event: FocusOutsideEvent) => void;
  /**
   * Platform: WEB ONLY
   */
  onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void;
  /**
   * Platform: WEB ONLY
   */
  collisionBoundary?: Element | null | Array<Element | null>;
  /**
   * Platform: WEB ONLY
   */
  sticky?: 'partial' | 'always';
  /**
   * Platform: WEB ONLY
   */
  hideWhenDetached?: boolean;
}

interface ForceMountable {
  forceMount?: true | undefined;
}

export type {
  BaseSlottableImageProps,
  BaseSlottablePressableProps,
  BaseSlottableTextProps,
  BaseSlottableViewProps,
  BasicPressEvents,
  ForceMountable,
  ImageRef,
  Insets,
  PositionedContentProps,
  PressableRef,
  Prettify,
  PropsWithout,
  PropsWithoutHTML,
  Slottable,
  SlottableImageProps,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
};
