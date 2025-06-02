import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  Portal,
} from '@radix-ui/react-dialog';
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
      <Dialog
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        children={children}
      />
    </RootContext.Provider>
  );
}

const Close = withRNPrimitives(DialogClose, 'pressable');
const Content = withRNPrimitives(DialogContent, 'view');
const Description = withRNPrimitives(DialogDescription, 'text');
const Overlay = withRNPrimitives(DialogOverlay, 'view');
const Title = withRNPrimitives(DialogTitle, 'text');
const Trigger = withRNPrimitives(DialogTrigger, 'pressable');

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger, useRootContext };
