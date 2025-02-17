// This project uses code from facebook/react-native
// The code is licensed under the MIT License.
// https://github.com/facebook/react-native

import type { StyleProp } from 'react-native';
import { Style } from './type';

export function flattenStyle<T extends Style>(style: StyleProp<T>): T | undefined {
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  const result = {} as T;
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i] as T);
    if (computedStyle) {
      for (const key in computedStyle) {
        result[key] = computedStyle[key];
      }
    }
  }
  return result;
}
