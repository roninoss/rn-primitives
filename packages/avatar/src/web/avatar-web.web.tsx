import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { withRNPrimitives } from '@rn-primitives/utils';

const Root = withRNPrimitives(Avatar, 'view');
const Image = withRNPrimitives(AvatarImage, 'image');
const Fallback = withRNPrimitives(AvatarFallback, 'view');

export { Fallback, Image, Root };
