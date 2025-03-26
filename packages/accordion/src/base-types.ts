import type { Prettify } from '@rn-primitives/types';
import type {
  ContentProps as ContentPropsWeb,
  ItemProps as ItemPropsWeb,
  RootProps as RootPropsWeb,
} from './web/types';

type BaseRootProps = Pick<
  RootPropsWeb,
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'onValueChange'
  | 'value'
  | 'collapsible'
  | 'disabled'
  | 'asChild'
>;

type BaseContentProps = Pick<ContentPropsWeb, 'forceMount'>;

type BaseHeaderProps = {};

type BaseItemProps = Pick<ItemPropsWeb, 'disabled' | 'value'>;

type BaseTriggerProps = {};

type BaseRootContext = Prettify<
  Pick<BaseRootProps, 'type' | 'collapsible' | 'disabled'> & {
    rootValue: BaseRootProps['value'];
    onRootValueChange: BaseRootProps['onValueChange'];
  }
> | null;

type BaseItemContext = Prettify<
  Pick<BaseItemProps, 'disabled'> & {
    itemValue: BaseItemProps['value'];
    isExpanded: boolean;
  }
> | null;

export type {
  BaseContentProps,
  BaseHeaderProps,
  BaseItemContext,
  BaseItemProps,
  BaseRootContext,
  BaseRootProps,
  BaseTriggerProps,
};
