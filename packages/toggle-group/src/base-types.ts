import type { RootProps as RootPropsWeb, ItemProps as ItemPropsWeb } from './web/types';

type BaseRootProps = Pick<
  RootPropsWeb,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'disabled' | 'asChild'
>;

type BaseItemProps = Pick<ItemPropsWeb, 'value' | 'disabled' | 'asChild'>;

type BaseRootContext = Pick<
  RootPropsWeb,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'disabled'
> | null;

type BaseItemContext = Pick<ItemPropsWeb, 'value'> | null;

export type { BaseRootProps, BaseItemProps, BaseRootContext, BaseItemContext };
