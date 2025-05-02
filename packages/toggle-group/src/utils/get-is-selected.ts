function getIsSelected(value: string | string[] | undefined, itemValue: string) {
  if (value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value === itemValue;
  }
  return value.includes(itemValue);
}

export { getIsSelected };
