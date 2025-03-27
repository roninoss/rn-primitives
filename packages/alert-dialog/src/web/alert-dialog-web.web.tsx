import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
  Portal,
} from '@radix-ui/react-alert-dialog';
import { useControllableState } from '@rn-primitives/hooks';
import { withRNPrimitives } from '@rn-primitives/utils';
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

const Action = withRNPrimitives(AlertDialogAction, 'pressable');
const Cancel = withRNPrimitives(AlertDialogCancel, 'pressable');
const Content = withRNPrimitives(AlertDialogContent, 'view');
const Description = withRNPrimitives(AlertDialogDescription, 'text');
const Overlay = withRNPrimitives(AlertDialogOverlay, 'view');
const Title = withRNPrimitives(AlertDialogTitle, 'text');
const Trigger = withRNPrimitives(AlertDialogTrigger, 'pressable');

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
