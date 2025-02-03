import type {
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionMultipleProps as BaseAccordionMultipleProps,
  AccordionSingleProps as BaseAccordionSingleProps,
} from '@radix-ui/react-accordion';
import type { Prettify, PropsWithoutHTML } from '@rn-primitives/types';

type AccordionRootProps = BaseAccordionMultipleProps | BaseAccordionSingleProps;

type BaseAccordionRootProps = Prettify<
  PropsWithoutHTML<AccordionRootProps, HTMLDivElement> & {
    collapsible?: boolean;
    defaultValue?: string | string[];
    dir?: 'ltr' | 'rtl';
  }
>;

type BaseAccordionContentProps = PropsWithoutHTML<AccordionContentProps, HTMLDivElement>;

type BaseAccordionHeaderProps = PropsWithoutHTML<AccordionHeaderProps, HTMLHeadingElement>;

type BaseAccordionItemProps = PropsWithoutHTML<AccordionItemProps, HTMLDivElement>;

type BaseAccordionTriggerProps = Omit<
  PropsWithoutHTML<AccordionTriggerProps, HTMLButtonElement>,
  | 'form'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'name'
  | 'type'
  | 'value'
  | 'disabled'
>;

type BaseAccordionTriggerRef = { trigger: () => void };

export type {
  BaseAccordionContentProps,
  BaseAccordionHeaderProps,
  BaseAccordionItemProps,
  BaseAccordionMultipleProps,
  BaseAccordionRootProps,
  BaseAccordionSingleProps,
  BaseAccordionTriggerProps,
  BaseAccordionTriggerRef,
};
