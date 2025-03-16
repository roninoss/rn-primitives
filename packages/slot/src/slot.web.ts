import { Root } from '@radix-ui/react-slot';

const Slot = Root as <T extends React.ElementType>(
  props: React.ComponentProps<T>
) => React.JSX.Element | null;

export { Slot };
