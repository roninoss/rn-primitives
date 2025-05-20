import type { ContentProps as ContentPropsWeb, RootProps as RootPropsWeb } from './web/types';

type BaseRootProps = Pick<
  RootPropsWeb,
  'open' | 'defaultOpen' | 'onOpenChange' | 'disabled' | 'asChild'
>;

type BaseTriggerProps = {};

type BaseContentProps = Pick<ContentPropsWeb, 'forceMount'>;

export type { BaseContentProps, BaseRootProps, BaseTriggerProps };
