import * as React from 'react';
import type { BaseItemContext, BaseRootContext } from '../base-types';

const RootContext = React.createContext<BaseRootContext>(null);
function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
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
      'ToggleGroupItem compound components cannot be rendered outside the ToggleGroupItem component'
    );
  }
  return context;
}

type ItemContextReturnType = ReturnType<typeof useItemContext>;

export { ItemContext, RootContext, useItemContext, useRootContext };

export type { ItemContextReturnType, RootContextReturnType };
