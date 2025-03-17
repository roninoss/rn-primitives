type PropObject = Record<string, any> | undefined;

function mergeProps<T extends PropObject[]>(...propsArray: T): T[number] {
  let result: PropObject | undefined = undefined;
  for (const props of propsArray) {
    if (props && typeof props === 'object') {
      if (!result) {
        result = props;
      } else {
        for (const key of Object.keys(props)) {
          result[key] = props[key];
        }
      }
    }
  }
  return result as T[number];
}

export { mergeProps };
