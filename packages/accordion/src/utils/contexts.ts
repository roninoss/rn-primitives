import * as React from 'react';
import type { BaseItemContext, BaseRootContext } from '../base-types';

const RootContext = React.createContext<BaseRootContext>(null);
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

const ItemContext = React.createContext<BaseItemContext | null>(null);

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

export { ItemContext, RootContext, useItemContext, useRootContext };

export type { ItemContextReturnType, RootContextReturnType };
