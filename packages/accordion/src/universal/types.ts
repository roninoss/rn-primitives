import type {
  BaseSlottablePressableProps,
  BaseSlottableViewProps,
  BasicPressEvents,
  Prettify,
} from '@rn-primitives/types';
import type {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionRootProps,
  BaseAccordionTriggerProps,
  BaseAccordionTriggerRef,
} from '../base-types';
import type {
  AccordionContentNativeOnlyProps,
  AccordionHeaderNativeOnlyProps,
  AccordionItemNativeOnlyProps,
  AccordionRootNativeOnlyProps,
  AccordionTriggerNativeOnlyProps,
} from '../native/types';
import type {
  AccordionContentWebOnlyProps,
  AccordionHeaderWebOnlyProps,
  AccordionItemWebOnlyProps,
  AccordionRootWebOnlyProps,
  AccordionTriggerWebOnlyProps,
} from '../web/types';

type ContentProps = Prettify<
  BaseAccordionContentProps &
    BaseSlottableViewProps & {
      native?: AccordionContentNativeOnlyProps;
      web?: AccordionContentWebOnlyProps;
    }
>;

type HeaderProps = Prettify<
  BaseAccordionHeaderProps &
    BaseSlottableViewProps & {
      native?: AccordionHeaderNativeOnlyProps;
      web?: AccordionHeaderWebOnlyProps;
    }
>;

type ItemProps = Prettify<
  BaseAccordionItemProps &
    BaseSlottableViewProps & {
      native?: AccordionItemNativeOnlyProps;
      web?: AccordionItemWebOnlyProps;
    }
>;

type RootProps = Prettify<
  BaseAccordionRootProps &
    BaseSlottableViewProps & {
      native?: AccordionRootNativeOnlyProps;
      web?: AccordionRootWebOnlyProps;
    }
>;

type TriggerProps = Prettify<
  BaseAccordionTriggerProps &
    BaseSlottablePressableProps & {
      native?: AccordionTriggerNativeOnlyProps;
      web?: AccordionTriggerWebOnlyProps;
    } & BasicPressEvents
>;
type TriggerRef = BaseAccordionTriggerRef;

export type { ContentProps, HeaderProps, ItemProps, RootProps, TriggerProps, TriggerRef };
