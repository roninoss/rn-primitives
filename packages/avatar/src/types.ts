import type { ComponentPropsWithAsChild, SlottableViewProps } from '@rn-primitives/types';
import type { Image } from 'react-native';

type AvatarRootProps = SlottableViewProps & {
  alt: string;
};

type AvatarImageProps = Omit<ComponentPropsWithAsChild<typeof Image>, 'alt'> & {
  children?: React.ReactNode;
  onLoadingStatusChange?: (status: 'error' | 'loaded') => void;
};

type AvatarFallbackProps = SlottableViewProps;

export type { AvatarFallbackProps, AvatarImageProps, AvatarRootProps };
