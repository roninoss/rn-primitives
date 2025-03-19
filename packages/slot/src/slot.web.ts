import { Root } from '@radix-ui/react-slot';

const Slot = Root as <T extends React.ElementType>(
  props: React.ComponentProps<T>
) => React.JSX.Element | null;

const Text = Slot;

const Pressable = Slot;

const View = Slot;

const Image = Slot;

export { Slot };

export { Text, Pressable, View, Image };
