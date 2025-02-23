import { rnStyleToWebStyle, useWebPressableProps } from '../../../web-light/dist';
import * as React from 'react';
import {
  Action as ActionWeb,
  Cancel as CancelWeb,
  type CancelRef as CancelWebRef,
  Content as ContentWeb,
  Description as DescriptionWeb,
  Overlay as OverlayWeb,
  Portal as PortalWeb,
  Root as RootWeb,
  Title as TitleWeb,
  Trigger as TriggerWeb,
  type TriggerRef as TriggerWebRef,
  useRootContext,
} from '../web';
import type {
  ActionProps,
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

function Content({ web, native: _native, style, ...props }: ContentProps) {
  return <ContentWeb {...props} style={rnStyleToWebStyle(style)} {...web} />;
}

function Description({ web, native: _native, style, ...props }: DescriptionProps) {
  return <DescriptionWeb {...props} style={rnStyleToWebStyle(style)} {...web} />;
}

function Overlay({ web, native: _native, style, ...props }: OverlayProps) {
  return <OverlayWeb {...props} style={rnStyleToWebStyle(style)} {...web} />;
}

function Portal({ web, native: _native, ...props }: PortalProps) {
  return <PortalWeb {...props} {...web} />;
}

function Title({ web, native: _native, style, ...props }: TitleProps) {
  return <TitleWeb {...props} style={rnStyleToWebStyle(style)} {...web} />;
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
        ref={ref as React.LegacyRef<TriggerWebRef>}
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

Trigger.displayName = 'AlertDialogTriggerUniversal';

function Action({
  web: webProps,
  native: _native,
  style: styleProp,
  children: childrenProp,
  onPress: onPressProp,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  ...props
}: ActionProps) {
  const { children, events, style } = useWebPressableProps({
    styleProp,
    childrenProp,
    webProps,
    onPressInProp,
    onPressOutProp,
  });

  return (
    <ActionWeb
      children={children}
      style={style}
      onClick={onPressProp}
      {...props}
      {...webProps}
      {...events}
    />
  );
}

const Cancel = React.forwardRef<CancelRef, CancelProps>(
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
      <CancelWeb
        ref={ref as React.LegacyRef<CancelWebRef>}
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
