import { ViewStyle, TextStyle } from 'react-native';

export const mergeBaseStyleWithUserStyle = <TemplateStyle extends ViewStyle | TextStyle>(
  baseStyle: (TemplateStyle | false | undefined | null)[],
  userStyle: any
): (TemplateStyle | false | undefined | null)[] => {
  if (isViewStyleArray(userStyle)) {
    // unfortunately, we can't use '...style' directly.
    // See isViewStyleArray() function for more details.
    return [...baseStyle, ...Object.values(userStyle as object)];
  }

  return [...baseStyle, userStyle];
};

export const isViewStyleArray = (obj: any): boolean => {
  if (typeof obj !== 'object') return false;

  const keysArray = Object.keys(obj);

  /**
   * unfortunately, Array.isArray(obj) is not working. It always return `false`
   * For some reason in case of an Array, we are getting an object
   * where keys are indexes like '0', '1', etc and values are the ViewStyle Object.
   * Example:
   *  {
   *    "0": {"alignItems": "center", "borderLeftWidth": 1, "borderRadius": 0},
   *    "1": {"backgroundColor": "white"},
   *    "2": false,
   *    "3": {"flex": 1}
   *  }
   */
  if (keysArray.includes('0')) return true;

  return false;
};
