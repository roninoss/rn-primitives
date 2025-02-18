import * as React from 'react';
import type { BaseAccordionItemContext, BaseAccordionRootContext } from '../base-types';

const RootContext = React.createContext<BaseAccordionRootContext>(null);
function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'Accordion compound components cannot be rendered outside the Accordion component'
    );
  }
  return context;
}

type RootContextReturnType = ReturnType<typeof useRootContext>;

const createItemContext = <T>() => React.createContext<(BaseAccordionItemContext & T) | null>(null);

function createUseItemContext<T>(accordionItemContext: ReturnType<typeof createItemContext<T>>) {
  return () => {
    const context = React.useContext(accordionItemContext);
    if (!context) {
      throw new Error(
        'AccordionItem compound components cannot be rendered outside the AccordionItem component'
      );
    }
    return context;
  };
}

type ItemContextReturnType<T> = ReturnType<typeof createUseItemContext<T>>;

export { createItemContext, createUseItemContext, RootContext, useRootContext };

export type { ItemContextReturnType, RootContextReturnType };
