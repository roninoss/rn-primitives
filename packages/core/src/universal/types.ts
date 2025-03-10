import type { Prettify } from '@rn-primitives/types';
import type {
  ImageProps as RNImageProps,
  PressableProps as RNPressableProps,
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

import type { ROLE_TO_ELEMENT_TAG_NAME_MAP } from '../web/constants';

type Role = keyof typeof ROLE_TO_ELEMENT_TAG_NAME_MAP;

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
  role?: Role;
  native?: ImagePropsNative;
  web?: ImagePropsWeb;
};

type PressableProps<T extends Role | undefined> = Prettify<
  Pick<RNPressableProps, BaseKeys | 'disabled'> & {
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
  } & {
    className?: string;
    role?: Role;
    native?: PressablePropsNative;
    web?: PressablePropsWeb<T>;
  }
>;

type PressableRef = { press?: () => void };

type TextProps<T extends Role | undefined> = Prettify<
  Pick<RNTextProps, BaseKeys> & {
    className?: string;
    role?: Role;
    native?: TextPropsNative;
    web?: TextPropsWeb<T>;
  }
>;

type ViewProps<T extends Role | undefined> = Prettify<
  Pick<RNViewProps, BaseKeys> & {
    className?: string;
    role?: Role;
    native?: ViewPropsNative;
    web?: ViewPropsWeb<T>;
  }
>;

export type { ImageProps, PressableProps, PressableRef, TextProps, ViewProps };
