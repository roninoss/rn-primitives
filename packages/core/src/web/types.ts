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

type BoxProps<T extends Role | undefined> = React.ComponentPropsWithoutRef<
  ElementTagFromRole<T>
> & {
  asChild?: boolean;
  role?: T;
};

type RoleForInputType = keyof typeof ROLE_TO_INPUT_TYPE_MAP;

type AriaLevel = keyof typeof ARIA_LEVEL_TO_ELEMENT_TAG_NAME_MAP;

export type {
  AriaLevel,
  BoxProps,
  ElementFromRole,
  ElementTagFromRole,
  Role,
  RoleForInputType,
  RoleToElementMap,
};
