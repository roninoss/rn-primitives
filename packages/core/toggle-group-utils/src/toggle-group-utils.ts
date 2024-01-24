export function getIsSelected(value: string | string[] | undefined, itemValue: string) {
  if (value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value === itemValue;
  }
  return value.includes(itemValue);
}

export function getNewSingleValue(
  originalValue: string | string[] | undefined,
  itemValue: string
) {
  if (originalValue === itemValue) {
    return undefined;
  }
  return itemValue;
}

export function getNewMultipleValue(
  originalValue: string | string[] | undefined,
  itemValue: string
) {
  if (originalValue === undefined) {
    return [itemValue];
  }
  if (typeof originalValue === 'string') {
    return originalValue === itemValue ? [] : [originalValue, itemValue];
  }
  if (originalValue.includes(itemValue)) {
    return originalValue.filter((v) => v !== itemValue);
  }
  return [...originalValue, itemValue];
}
