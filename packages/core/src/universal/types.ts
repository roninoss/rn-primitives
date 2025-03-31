import type { Prettify } from '@rn-primitives/types';
import type {
  ImageProps as RNImageProps,
  PressableProps as RNPressableProps,
  Role as RNRole,
  TextProps as RNTextProps,
  ViewProps as RNViewProps,
} from 'react-native';
import type {
  ImageProps as ImagePropsNative,
  PressableProps as PressablePropsNative,
  TextProps as TextPropsNative,
  ViewProps as ViewPropsNative,
} from '../native';
import type {
  ImageProps as ImagePropsWeb,
  PressableProps as PressablePropsWeb,
  TextProps as TextPropsWeb,
  ViewProps as ViewPropsWeb,
} from '../web';
import { ElementTag } from '../web/types';

type BaseKeys =
  | 'style'
  | 'children'
  | 'aria-busy'
  | 'aria-checked'
  | 'aria-expanded'
  | 'aria-hidden'
  | 'aria-label'
  | 'aria-selected'
  | 'aria-labelledby'
  | 'aria-live'
  | 'aria-modal';

type ImagePropsUniversal = Prettify<
  Pick<RNImageProps, Exclude<BaseKeys, 'children'>> & {
    className?: string;
  }
> & {
  role?: RNRole;
} & (
    | { asChild?: undefined | false; src: string }
    | { asChild: true; children: React.ReactNode; src?: string }
  );

type ImageProps = ImagePropsUniversal & {
  native?: ImagePropsNative;
  web?: ImagePropsWeb;
};

type PressablePropsUniversal = Prettify<
  Pick<RNPressableProps, BaseKeys | 'disabled'> & {
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
  } & {
    ref?: React.RefObject<PressableRef | null>;
    className?: string;
    role?: RNRole;
    asChild?: boolean | undefined;
  }
>;

type PressableProps<T extends ElementTag> = PressablePropsUniversal & {
  native?: PressablePropsNative;
  web?: PressablePropsWeb<T>;
};

type PressableRefUniversal = { press: () => void };
type PressableRef = PressableRefUniversal;

type TextPropsUniversal = Prettify<
  Pick<RNTextProps, BaseKeys> & {
    className?: string;
    role?: RNRole;
    asChild?: boolean | undefined;
  }
>;

type TextProps<T extends ElementTag> = TextPropsUniversal & {
  native?: TextPropsNative;
  web?: TextPropsWeb<T>;
};

type ViewPropsUniversal = Prettify<
  Pick<RNViewProps, BaseKeys> & {
    className?: string;
    role?: RNRole;
    asChild?: boolean | undefined;
  }
>;

type ViewProps<T extends ElementTag> = ViewPropsUniversal & {
  native?: ViewPropsNative;
  web?: ViewPropsWeb<T>;
};

export type {
  ElementTag,
  ImageProps,
  ImagePropsUniversal,
  PressableProps,
  PressablePropsUniversal,
  PressableRef,
  PressableRefUniversal,
  TextProps,
  TextPropsUniversal,
  ViewProps,
  ViewPropsUniversal,
};
