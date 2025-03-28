import type { AspectRatioProps } from '@radix-ui/react-aspect-ratio';

type RootPropsWebOnly = Omit<AspectRatioProps, 'ratio'>;

type RootProps = AspectRatioProps;

export type { RootProps, RootPropsWebOnly };
