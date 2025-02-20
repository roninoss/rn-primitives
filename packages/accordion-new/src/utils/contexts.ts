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

const ItemContext = React.createContext<BaseAccordionItemContext | null>(null);

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component'
    );
  }
  return context;
}

type ItemContextReturnType = ReturnType<typeof useItemContext>;

export { ItemContext, useItemContext, RootContext, useRootContext };

export type { ItemContextReturnType, RootContextReturnType };
