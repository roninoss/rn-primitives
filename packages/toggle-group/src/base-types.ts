import type { ItemProps as ItemPropsWeb, RootProps as RootPropsWeb } from './web/types';

type BaseRootProps = Pick<
  RootPropsWeb,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'disabled'
>;

type BaseItemProps = Pick<ItemPropsWeb, 'value' | 'disabled'>;

type BaseRootContext = Pick<
  RootPropsWeb,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'disabled'
> | null;

type BaseItemContext = Pick<ItemPropsWeb, 'value'> | null;

export type { BaseItemContext, BaseItemProps, BaseRootContext, BaseRootProps };
