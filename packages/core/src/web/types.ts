import type { Slottable } from '@rn-primitives/types';
import type {
  ARIA_LEVEL_TO_ELEMENT_TAG_NAME_MAP,
  ROLE_TO_ELEMENT_TAG_NAME_MAP,
  ROLE_TO_INPUT_TYPE_MAP,
} from './constants';

type RoleToElementMap = typeof ROLE_TO_ELEMENT_TAG_NAME_MAP;
type Role = keyof RoleToElementMap;

type ElementTagFromRole<R extends Role | undefined> = R extends Role
  ? Extract<RoleToElementMap[R], keyof HTMLElementTagNameMap>
  : 'div';

type ElementFromRole<R extends Role | undefined> = HTMLElementTagNameMap[ElementTagFromRole<R>];

type DivProps<T extends Role | undefined> = React.ComponentPropsWithoutRef<
  ElementTagFromRole<T>
> & {
  asChild?: boolean;
  role?: T;
};

type RoleForInputType = keyof typeof ROLE_TO_INPUT_TYPE_MAP;

type AriaLevel = keyof typeof ARIA_LEVEL_TO_ELEMENT_TAG_NAME_MAP;

type PressableProps<T extends Role | undefined> = DivProps<T>;
type TextProps<T extends Role | undefined> = DivProps<T>;
type ViewProps<T extends Role | undefined> = DivProps<T>;
type ImageProps = Slottable<React.ComponentPropsWithoutRef<'img'>>;

export type {
  AriaLevel,
  DivProps,
  ElementFromRole,
  ElementTagFromRole,
  ImageProps,
  PressableProps,
  Role,
  RoleForInputType,
  RoleToElementMap,
  TextProps,
  ViewProps,
};
