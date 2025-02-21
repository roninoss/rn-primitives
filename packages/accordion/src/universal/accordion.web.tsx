import { rnStyleToWebStyle, useWebPressableProps } from '@rn-primitives/web';
import * as React from 'react';
import { BaseAccordionTriggerRef } from '../base-types';
import {
  Content as ContentWeb,
  Header as HeaderWeb,
  Item as ItemWeb,
  Root as RootWeb,
  Trigger as TriggerWeb,
  useItemContext,
  useRootContext,
} from '../web';
import type { AccordionTriggerWebOnlyRef } from '../web/types';
import type {
  ContentProps,
  HeaderProps,
  ItemProps,
  RootProps,
  TriggerProps,
  TriggerRef,
} from './types';

function Root({ native: _native, web, style, ...props }: RootProps) {
  return <RootWeb {...props} style={rnStyleToWebStyle(style)} {...web} />;
}

function Content({ native: _native, style, web, ...props }: ContentProps) {
  return <ContentWeb {...props} style={rnStyleToWebStyle(style)} {...web} />;
}

function Header({ native: _native, style, web, ...props }: HeaderProps) {
  return <HeaderWeb {...props} style={rnStyleToWebStyle(style)} {...web} />;
}

function Item({ native: _native, style, web, ...props }: ItemProps) {
  return <ItemWeb {...props} style={rnStyleToWebStyle(style)} {...web} />;
}

const Trigger = React.forwardRef<TriggerRef, TriggerProps>(
  (
    {
      native: _native,
      style: styleProp,
      children: childrenProp,
      onPress: onPressProp,
      onPressIn: onPressInProp,
      onPressOut: onPressOutProp,
      web: webProps,
      ...props
    },
    ref
  ) => {
    const { children, events, style } = useWebPressableProps({
      styleProp,
      childrenProp,
      webProps,
      onPressInProp,
      onPressOutProp,
    });

    return (
      <TriggerWeb
        ref={ref as React.LegacyRef<AccordionTriggerWebOnlyRef & BaseAccordionTriggerRef>}
        children={children}
        style={style}
        onClick={onPressProp}
        {...props}
        {...webProps}
        {...events}
      />
    );
  }
);

export { Content, Header, Item, Root, Trigger, useItemContext, useRootContext };
