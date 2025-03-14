import type { Prettify } from '@rn-primitives/types';
import type {
  ContentProps as ContentPropsWeb,
  HeaderProps as HeaderPropsWeb,
  ItemProps as ItemPropsWeb,
  RootProps as RootPropsWeb,
  TriggerProps as TriggerPropsWeb,
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

type BaseContentProps = Pick<ContentPropsWeb, 'forceMount' | 'asChild'>;

type BaseHeaderProps = Pick<HeaderPropsWeb, 'asChild'>;

type BaseItemProps = Pick<ItemPropsWeb, 'disabled' | 'value' | 'asChild'>;

type BaseTriggerProps = Pick<TriggerPropsWeb, 'asChild'>;

type BaseRootContext = Prettify<
  Omit<BaseRootProps, 'asChild' | 'defaultValue' | 'value' | 'onValueChange'> & {
    rootValue: BaseRootProps['value'];
    onRootValueChange: BaseRootProps['onValueChange'];
  }
> | null;

type BaseItemContext = Prettify<
  Omit<BaseItemProps, 'asChild' | 'value'> & {
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
