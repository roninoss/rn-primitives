import {
  AlertDialog,
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog';
import { useControllableState } from '@rn-primitives/hooks';
import * as React from 'react';
import { RootContext, useRootContext } from '../utils/contexts';
import type { RootProps } from './types';

function Root({
  children,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  open: openProp,
}: RootProps) {
  const [open = false, onOpenChange] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChangeProp,
  });

  return (
    <RootContext.Provider value={{ open, onOpenChange }}>
      <AlertDialog
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        children={children}
      />
    </RootContext.Provider>
  );
}

export {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
  useRootContext,
};
