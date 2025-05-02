function getNewMultipleValue(originalValue: string | string[] | undefined, itemValue: string) {
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

export { getNewMultipleValue };
