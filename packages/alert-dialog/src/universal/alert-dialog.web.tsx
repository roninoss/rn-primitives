import { Pressable, Text, View } from '@rn-primitives/core';
import * as React from 'react';
import {
  Action as ActionWeb,
  Cancel as CancelWeb,
  ContentRef,
  Content as ContentWeb,
  Description as DescriptionWeb,
  Overlay as OverlayWeb,
  Portal as PortalWeb,
  Root as RootWeb,
  Title as TitleWeb,
  Trigger as TriggerWeb,
  useRootContext,
} from '../web';
import type {
  ActionProps,
  ActionRef,
  CancelProps,
  CancelRef,
  ContentProps,
  DescriptionProps,
  OverlayProps,
  PortalProps,
  RootProps,
  TitleProps,
  TriggerProps,
  TriggerRef,
} from './types';

function Root(props: RootProps) {
  return <RootWeb {...props} />;
}

const Content = React.forwardRef<any, ContentProps>(
  ({ web, native: _native, style, ...props }, ref) => {
    if (style) {
      return (
        <View style={style} asChild>
          <ContentWeb ref={ref} {...props} {...web} />
        </View>
      );
    }
    return <ContentWeb ref={ref} {...props} {...web} />;
  }
);

Content.displayName = 'AlertDialogContentUniversal';

function Description({ web, native: _native, style, ...props }: DescriptionProps) {
  if (style) {
    return (
      <Text style={style} asChild>
        <DescriptionWeb {...props} {...web} />
      </Text>
    );
  }

  return <DescriptionWeb {...props} {...web} />;
}

function Overlay({ web, native: _native, style, ...props }: OverlayProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <OverlayWeb {...props} {...web} />
      </View>
    );
  }
  return <OverlayWeb {...props} {...web} />;
}

function Portal({ web, native: _native, ...props }: PortalProps) {
  return <PortalWeb {...props} {...web} />;
}

function Title({ web, native: _native, style, ...props }: TitleProps) {
  if (style) {
    return (
      <Text style={style} asChild>
        <TitleWeb {...props} {...web} />
      </Text>
    );
  }
  return <TitleWeb {...props} {...web} />;
}

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(
  ({ native: _native, web, ...props }, ref) => {
    return (
      <TriggerWeb asChild>
        <Pressable web={{ as: 'button', ...web }} ref={ref} {...props} />
      </TriggerWeb>
    );
  }
);

Trigger.displayName = 'AlertDialogTriggerUniversal';

const Action = React.forwardRef<ActionRef, ActionProps>(
  ({ native: _native, web, ...props }, ref) => {
    return (
      <ActionWeb asChild>
        <Pressable web={{ as: 'button', ...web }} ref={ref} {...props} />
      </ActionWeb>
    );
  }
);

const Cancel = React.forwardRef<CancelRef, CancelProps>(
  ({ native: _native, web, ...props }, ref) => {
    return (
      <CancelWeb asChild>
        <Pressable web={{ as: 'button', ...web }} ref={ref} {...props} />
      </CancelWeb>
    );
  }
);

Cancel.displayName = 'AlertDialogCancelUniversal';

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
