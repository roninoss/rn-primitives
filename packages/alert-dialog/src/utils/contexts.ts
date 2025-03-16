import * as React from 'react';
import type { BaseAlertDialogRootContext } from '../base-types';

const RootContext = React.createContext<BaseAlertDialogRootContext>(null);
function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'Alert Dialog compound components cannot be rendered outside the Alert Dialog component'
    );
  }
  return context;
}

type RootContextReturnType = ReturnType<typeof useRootContext>;

export { RootContext, useRootContext };

export type { RootContextReturnType };
