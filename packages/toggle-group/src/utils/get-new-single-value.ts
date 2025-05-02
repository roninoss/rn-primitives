function getNewSingleValue(originalValue: string | string[] | undefined, itemValue: string) {
  if (originalValue === itemValue) {
    return undefined;
  }
  return itemValue;
}

export { getNewSingleValue };
