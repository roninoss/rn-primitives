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

type ImageProps = Prettify<
  Pick<RNImageProps, Exclude<BaseKeys, 'children'>> & {
    className?: string;
  }
> & {
  src: string;
  role?: RNRole;
  native?: ImagePropsNative;
  web?: ImagePropsWeb;
};

type PressableProps<T extends ElementTag> = Prettify<
  Pick<RNPressableProps, BaseKeys | 'disabled'> & {
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
  } & {
    className?: string;
    role?: RNRole;
    native?: PressablePropsNative;
    web?: PressablePropsWeb<T>;
  }
>;

type PressableRef = { press?: () => void };

type TextProps<T extends ElementTag> = Prettify<
  Pick<RNTextProps, BaseKeys> & {
    className?: string;
    role?: RNRole;
    native?: TextPropsNative;
    web?: TextPropsWeb<T>;
  }
>;

type ViewProps<T extends ElementTag> = Prettify<
  Pick<RNViewProps, BaseKeys> & {
    className?: string;
    role?: RNRole;
    native?: ViewPropsNative;
    web?: ViewPropsWeb<T>;
  }
>;

export type { ElementTag, ImageProps, PressableProps, PressableRef, TextProps, ViewProps };
