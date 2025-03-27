/**
 * Adds the `data-rn-primitives` attribute to the component.
 * @param Component - The component to wrap.
 * @param type { 'view' | 'text' | 'pressable' | 'image' } - The type of primitive to add.
 * @returns The wrapped component.
 */
function withRNPrimitives<T>(
  Component: React.ComponentType<T>,
  type: 'view' | 'text' | 'pressable' | 'image'
) {
  const RNPrimitiveComponent = (props: React.ComponentProps<typeof Component>) => {
    return <Component data-rn-primitives={type} {...props} />;
  };
  return RNPrimitiveComponent;
}

export { withRNPrimitives };
