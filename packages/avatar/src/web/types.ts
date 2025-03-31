import type { AvatarFallbackProps, AvatarImageProps, AvatarProps } from '@radix-ui/react-avatar';

type RootProps = AvatarProps;
type RootPropsWebOnly = React.ComponentProps<'span'>;

type FallbackProps = AvatarFallbackProps;
type FallbackPropsWebOnly = React.ComponentProps<'span'>;

type ImageProps = AvatarImageProps;
type ImagePropsWebOnly = React.ComponentProps<'img'>;

export type {
  FallbackProps,
  FallbackPropsWebOnly,
  ImageProps,
  ImagePropsWebOnly,
  RootProps,
  RootPropsWebOnly,
};
