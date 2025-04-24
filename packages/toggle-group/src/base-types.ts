import type { RootProps as RootPropsWeb, ItemProps as ItemPropsWeb } from './web/types';

type BaseRootProps = Pick<
  RootPropsWeb,
  'type' | 'value' | 'onValueChange' | 'disabled' | 'asChild'
>;

type BaseItemProps = Pick<ItemPropsWeb, 'value' | 'asChild'>;

type BaseRootContext = Pick<RootPropsWeb, 'type' | 'value' | 'onValueChange' | 'disabled'> | null;

type BaseItemContext = Pick<ItemPropsWeb, 'value'> | null;

export type { BaseRootProps, BaseItemProps, BaseRootContext, BaseItemContext };
