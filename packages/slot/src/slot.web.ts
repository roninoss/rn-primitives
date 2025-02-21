import { Root } from '@radix-ui/react-slot';

const Slot = Root as <T extends React.ElementType>(
  props: React.ComponentPropsWithoutRef<T> & { ref?: React.Ref<React.ElementRef<T>> }
) => React.ReactElement | null;

export { Slot };
