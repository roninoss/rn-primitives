function isItemExpanded(rootValue: string | string[] | undefined, value: string) {
  return Array.isArray(rootValue) ? rootValue.includes(value) : rootValue === value;
}

export { isItemExpanded };
