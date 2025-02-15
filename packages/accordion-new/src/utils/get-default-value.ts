export function getDefaultValue(
  defaultValue: string | string[] | undefined,
  type: 'multiple' | 'single'
) {
  if (!defaultValue) {
    return undefined;
  }

  if (type === 'multiple' && !Array.isArray(defaultValue)) {
    return [defaultValue];
  }

  if (type === 'single' && Array.isArray(defaultValue)) {
    return defaultValue[0];
  }

  return defaultValue;
}
