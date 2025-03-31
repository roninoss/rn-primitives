import type { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const Root = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/avatar/web is only supported on web.');
  }
  return null;
}) as unknown as typeof Avatar;

const Image = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Image` from @rn-primitives/avatar/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AvatarImage;

const Fallback = (() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Fallback` from @rn-primitives/avatar/web is only supported on web.');
  }
  return null;
}) as unknown as typeof AvatarFallback;

export { Fallback, Image, Root };
