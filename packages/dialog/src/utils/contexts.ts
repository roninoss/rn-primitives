import * as React from 'react';
import type { BaseDialogRootContext } from '../base-types';

const RootContext = React.createContext<BaseDialogRootContext>(null);
function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Dialog compound components cannot be rendered outside the Dialog component');
  }
  return context;
}

type RootContextReturnType = ReturnType<typeof useRootContext>;

export { RootContext, useRootContext };

export type { RootContextReturnType };
