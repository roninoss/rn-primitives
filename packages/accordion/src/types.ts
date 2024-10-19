import type {
  ForceMountable,
  SlottablePressableProps,
  SlottableViewProps,
} from '@rn-primitives/types';

type RootContext = {
  type: 'single' | 'multiple';
  value: (string | undefined) | string[];
  onValueChange: (value: string | undefined) => void | ((value: string[]) => void);
  collapsible: boolean;
  disabled?: boolean;
};

type SingleRootProps = {
  type: 'single';
  defaultValue?: string | undefined;
  value?: string | undefined;
  onValueChange?: (value: string | undefined) => void;
};

type MultipleRootProps = {
  type: 'multiple';
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

type AccordionRootProps = (SingleRootProps | MultipleRootProps) & {
  defaultValue?: string | string[];
  disabled?: boolean;
  collapsible?: boolean;
  /**
   * Platform: WEB ONLY
   */
  dir?: 'ltr' | 'rtl';
  /**
   * Platform: WEB ONLY
   */
  orientation?: 'vertical' | 'horizontal';
} & SlottableViewProps;

type AccordionItemProps = {
  value: string;
  disabled?: boolean;
} & SlottableViewProps;

type AccordionContentProps = ForceMountable & SlottableViewProps;
type AccordionHeaderProps = SlottableViewProps;
type AccordionTriggerProps = SlottablePressableProps;

export type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionRootProps,
  RootContext,
  AccordionHeaderProps,
  AccordionTriggerProps,
};
