import type {
  ForceMountable,
  SlottablePressableProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type TabsRootProps = SlottableViewProps & {
  value: string;
  onValueChange: (value: string) => void;
  /**
   * Platform: WEB ONLY
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  activationMode?: 'automatic' | 'manual';
};

type TabsListProps = SlottableViewProps;
type TabsTriggerProps = SlottablePressableProps & {
  value: string;
};
type TabsContentProps = SlottableViewProps &
  ForceMountable & {
    value: string;
  };

export type { TabsContentProps, TabsListProps, TabsRootProps, TabsTriggerProps };
