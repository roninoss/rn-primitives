import { Pressable, Text, View } from '@rn-primitives/core';
import * as React from 'react';
import {
  Action as ActionWeb,
  Cancel as CancelWeb,
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
  CancelProps,
  ContentProps,
  DescriptionProps,
  OverlayProps,
  PortalProps,
  RootProps,
  TitleProps,
  TriggerProps,
} from './types';

function Root(props: RootProps) {
  return <RootWeb {...props} />;
}

function Content({ web, native: _native, style, ...props }: ContentProps) {
  if (style) {
    return (
      <View style={style} asChild>
        <ContentWeb {...props} {...web} />
      </View>
    );
  }
  return <ContentWeb {...props} {...web} />;
}

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

function Trigger({ native: _native, web, ...props }: TriggerProps) {
  return (
    <TriggerWeb asChild>
      <Pressable web={{ as: 'button', ...web }} {...props} />
    </TriggerWeb>
  );
}

function Action({ native: _native, web, ...props }: ActionProps) {
  return (
    <ActionWeb asChild>
      <Pressable web={{ as: 'button', ...web }} {...props} />
    </ActionWeb>
  );
}

function Cancel({ native: _native, web, ...props }: CancelProps) {
  return (
    <CancelWeb asChild>
      <Pressable web={{ as: 'button', ...web }} {...props} />
    </CancelWeb>
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
