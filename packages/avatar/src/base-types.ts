import type { AvatarFallbackProps, AvatarImageProps } from '@radix-ui/react-avatar';

type BaseAvatarRootProps = {
  alt: string;
};

type BaseAvatarImageProps = {
  onLoadingStatusChange?: AvatarImageProps['onLoadingStatusChange'];
  src: string;
};

type BaseAvatarFallbackProps = { delayMs?: AvatarFallbackProps['delayMs'] };

export type { BaseAvatarFallbackProps, BaseAvatarImageProps, BaseAvatarRootProps };
