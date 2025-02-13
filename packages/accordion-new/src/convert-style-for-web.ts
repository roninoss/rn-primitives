// This project uses code from necolas/react-native-web
// The code is licensed under the MIT License.
// https://github.com/necolas/react-native-web

// @ts-expect-error - no types
import normalizeRNColor from '@react-native/normalize-colors';
import { type StyleProp, StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

// TODO: add default RN styles - maybe with css through a class name?

// TODO: test this works
// TODO: move to other package
// TODO: clean up

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const supportsCSS3TextDecoration =
  !canUseDOM ||
  (window.CSS != null &&
    window.CSS.supports != null &&
    (window.CSS.supports('text-decoration-line', 'none') ||
      window.CSS.supports('-webkit-text-decoration-line', 'none')));

const MONOSPACE_FONT_STACK = 'monospace,monospace';

const SYSTEM_FONT_STACK =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

const STYLE_SHORT_FORM_EXPANSIONS = {
  borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
  borderBlockColor: ['borderTopColor', 'borderBottomColor'],
  borderInlineColor: ['borderRightColor', 'borderLeftColor'],
  borderRadius: [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
  ],
  borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
  borderBlockStyle: ['borderTopStyle', 'borderBottomStyle'],
  borderInlineStyle: ['borderRightStyle', 'borderLeftStyle'],
  borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  borderBlockWidth: ['borderTopWidth', 'borderBottomWidth'],
  borderInlineWidth: ['borderRightWidth', 'borderLeftWidth'],
  insetBlock: ['top', 'bottom'],
  insetInline: ['left', 'right'],
  marginBlock: ['marginTop', 'marginBottom'],
  marginInline: ['marginRight', 'marginLeft'],
  paddingBlock: ['paddingTop', 'paddingBottom'],
  paddingInline: ['paddingRight', 'paddingLeft'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
  borderBlockStartColor: ['borderTopColor'],
  borderBlockStartStyle: ['borderTopStyle'],
  borderBlockStartWidth: ['borderTopWidth'],
  borderBlockEndColor: ['borderBottomColor'],
  borderBlockEndStyle: ['borderBottomStyle'],
  borderBlockEndWidth: ['borderBottomWidth'],
  borderEndStartRadius: ['borderBottomLeftRadius'],
  borderEndEndRadius: ['borderBottomRightRadius'],
  borderStartStartRadius: ['borderTopLeftRadius'],
  borderStartEndRadius: ['borderTopRightRadius'],
  insetBlockEnd: ['bottom'],
  insetBlockStart: ['top'],
  marginBlockStart: ['marginTop'],
  marginBlockEnd: ['marginBottom'],
  paddingBlockStart: ['paddingTop'],
  paddingBlockEnd: ['paddingBottom'],
};

type Style = TextStyle | ViewStyle | ImageStyle;

export function convertStyleForWeb<T extends Style>(
  reactNativeStyle?: StyleProp<T>
): React.CSSProperties | undefined {
  if (!reactNativeStyle) {
    return;
  }

  const style = (
    Array.isArray(reactNativeStyle) ? StyleSheet.flatten(reactNativeStyle) : reactNativeStyle
  ) as T;

  const resolvedStyle: Record<string, unknown> = {};

  for (const prop in style) {
    const value = style[prop as keyof T];

    if (
      // Ignore everything with a null/undefined value
      value == null
    ) {
      continue;
    }

    if (prop === 'backgroundClip') {
      if (value === 'text') {
        resolvedStyle.backgroundClip = value;
        resolvedStyle.WebkitBackgroundClip = value;
      }
    } else if (prop === 'flex') {
      if (value === -1) {
        resolvedStyle.flexGrow = 0;
        resolvedStyle.flexShrink = 1;
        resolvedStyle.flexBasis = 'auto';
      } else {
        resolvedStyle.flex = value;
      }
    } else if (prop === 'font' && typeof value === 'string') {
      resolvedStyle[prop] = value.replace('System', SYSTEM_FONT_STACK);
    } else if (prop === 'fontFamily') {
      if (typeof value === 'string' && value.indexOf('System') > -1) {
        const stack = value.split(/,\s*/);
        stack[stack.indexOf('System')] = SYSTEM_FONT_STACK;
        resolvedStyle[prop] = stack.join(',');
      } else if (value === 'monospace') {
        resolvedStyle[prop] = MONOSPACE_FONT_STACK;
      } else {
        resolvedStyle[prop] = value;
      }
    } else if (prop === 'textDecorationLine') {
      // use 'text-decoration' for browsers that only support CSS2
      // text-decoration (e.g., IE, Edge)
      if (!supportsCSS3TextDecoration) {
        resolvedStyle.textDecoration = value;
      } else {
        resolvedStyle.textDecorationLine = value;
      }
    } else if (prop === 'writingDirection') {
      resolvedStyle.direction = value;
    } else {
      const value = normalize(style[prop], prop);
      const longFormProperties =
        STYLE_SHORT_FORM_EXPANSIONS[prop as keyof typeof STYLE_SHORT_FORM_EXPANSIONS];
      if (prop === 'inset') {
        if (style.insetInline == null) {
          resolvedStyle.left = value;
          resolvedStyle.right = value;
        }
        if (style.insetBlock == null) {
          resolvedStyle.top = value;
          resolvedStyle.bottom = value;
        }
      } else if (prop === 'margin') {
        if (style.marginInline == null) {
          resolvedStyle.marginLeft = value;
          resolvedStyle.marginRight = value;
        }
        if (style.marginBlock == null) {
          resolvedStyle.marginTop = value;
          resolvedStyle.marginBottom = value;
        }
      } else if (prop === 'padding') {
        if (style.paddingInline == null) {
          resolvedStyle.paddingLeft = value;
          resolvedStyle.paddingRight = value;
        }
        if (style.paddingBlock == null) {
          resolvedStyle.paddingTop = value;
          resolvedStyle.paddingBottom = value;
        }
      } else if (longFormProperties) {
        longFormProperties.forEach((longForm, i) => {
          // The value of any longform property in the original styles takes
          // precedence over the shortform's value.
          if (style[longForm as keyof Style] == null) {
            resolvedStyle[longForm] = value;
          }
        });
      } else {
        resolvedStyle[prop] = value;
      }
    }
  }

  return resolvedStyle;
}

const unitlessNumbers = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexOrder: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  fontWeight: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowGap: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnGap: true,
  gridColumnStart: true,
  lineClamp: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
  // transform types
  scale: true,
  scaleX: true,
  scaleY: true,
  scaleZ: true,
  // RN properties
  shadowOpacity: true,
};

const colorProps = {
  backgroundColor: true,
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  color: true,
  shadowColor: true,
  textDecorationColor: true,
  textShadowColor: true,
};

function normalize(value: any, property?: string) {
  let returnValue = value;
  if (
    (property == null || !unitlessNumbers[property as keyof typeof unitlessNumbers]) &&
    typeof value === 'number'
  ) {
    returnValue = `${value}px`;
  } else if (property != null && colorProps[property as keyof typeof colorProps]) {
    returnValue = normalizeColor(value);
  }
  return returnValue;
}

const isWebColor = (color: string): boolean =>
  color === 'currentcolor' ||
  color === 'currentColor' ||
  color === 'inherit' ||
  color.indexOf('var(') === 0;

const processColor = (color?: string | number) => {
  if (color === undefined || color === null) {
    return color;
  }

  // convert number and hex
  let int32Color: number | null = normalizeRNColor(color);
  if (int32Color === undefined || int32Color === null) {
    return undefined;
  }

  int32Color = ((int32Color << 24) | (int32Color >>> 8)) >>> 0;

  return int32Color;
};

const normalizeColor = (color?: number | string, opacity = 1): void | string => {
  if (color == null) return;

  if (typeof color === 'string' && isWebColor(color)) {
    return color;
  }

  const colorInt = processColor(color);
  if (colorInt != null) {
    const r = (colorInt >> 16) & 255;
    const g = (colorInt >> 8) & 255;
    const b = colorInt & 255;
    const a = ((colorInt >> 24) & 255) / 255;
    const alpha = (a * opacity).toFixed(2);
    return `rgba(${r},${g},${b},${alpha})`;
  }
};
