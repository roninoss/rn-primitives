import type { PressableProps as RNPressableProps, Role } from 'react-native';
import { EmptyGestureResponderEvent } from '@rn-primitives/utils';
import * as React from 'react';
import { useWebPressableProps } from './use-web-pressable-props';

// TODO: type props an share with native universal + use native and web props
const Pressable = React.memo(({ native: _native, web, role = 'button', ...props }: any) => {
  const { children, events, style } = useWebPressableProps({
    styleProp: props.style,
    childrenProp: props.children,
    webProps: props.web,
    onPressInProp: props.onPressIn,
    onPressOutProp: props.onPressOut,
  });

  const mappedProps = mapPressableToButtonProps({ ...props });
  const Component = getComponent(role);

  return <Component {...mappedProps} children={children} style={style} {...web} {...events} />;
});

export { Pressable };

type PressableProps = Pick<
  RNPressableProps,
  | 'onPress'
  | 'onPressIn'
  | 'onPressOut'
  | 'disabled'
  | 'role'
  | 'aria-busy'
  | 'aria-checked'
  | 'aria-expanded'
  | 'aria-hidden'
  | 'aria-label'
  | 'aria-selected'
  | 'aria-labelledby'
  | 'aria-live'
  | 'aria-modal'
>;

function mapPressableToButtonProps(
  pressableProps: PressableProps
): React.ButtonHTMLAttributes<HTMLButtonElement> {
  const {
    onPress,
    onPressIn,
    onPressOut,
    disabled,
    role,
    'aria-busy': ariaBusy,
    'aria-checked': ariaChecked,
    'aria-expanded': ariaExpanded,
    'aria-hidden': ariaHidden,
    'aria-label': ariaLabel,
    'aria-selected': ariaSelected,
    'aria-labelledby': ariaLabelledby,
    'aria-live': ariaLive,
    'aria-modal': ariaModal,
  } = pressableProps;

  const handlePress = () => {
    if (disabled || !onPress) return;
    onPress(EmptyGestureResponderEvent);
  };

  const handlePressIn = () => {
    if (disabled) return;
    onPressIn?.(EmptyGestureResponderEvent);
  };

  const handlePressOut = () => {
    if (disabled) return;
    onPressOut?.(EmptyGestureResponderEvent);
  };

  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: 'button',
  };

  if (disabled) {
    buttonProps.disabled = true;
  }

  if (onPress) {
    buttonProps.onClick = handlePress;
  }

  if (onPressIn) {
    buttonProps.onMouseDown = handlePressIn;
    buttonProps.onTouchStart = handlePressIn;
  }

  if (onPressOut) {
    buttonProps.onMouseUp = handlePressOut;
    buttonProps.onTouchEnd = handlePressOut;
  }

  if (ariaLabel) {
    buttonProps['aria-label'] = ariaLabel;
  }

  if (ariaBusy) {
    buttonProps['aria-busy'] = ariaBusy;
  }

  if (ariaChecked) {
    buttonProps['aria-checked'] = ariaChecked;
  }

  if (ariaExpanded) {
    buttonProps['aria-expanded'] = ariaExpanded;
  }

  if (ariaHidden) {
    buttonProps['aria-hidden'] = ariaHidden;
  }

  if (ariaSelected) {
    buttonProps['aria-selected'] = ariaSelected;
  }

  if (ariaLabelledby) {
    buttonProps['aria-labelledby'] = ariaLabelledby;
  }

  if (ariaLive) {
    buttonProps['aria-live'] = ariaLive;
  }

  if (ariaModal) {
    buttonProps['aria-modal'] = ariaModal;
  }

  const accessibilityRole = role ?? 'button';

  // Only set role if it's not the default 'button'
  if (role && role !== 'button') {
    buttonProps.role = accessibilityRole;
  }

  return buttonProps;
}

const roleComponents: Partial<Record<Role, string>> = {
  article: 'article',
  banner: 'header',
  button: 'button',
  complementary: 'aside',
  contentinfo: 'footer',
  figure: 'figure',
  form: 'form',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section',
};

function getComponent(role: string) {
  if (role === 'button') {
    return 'button';
  }

  return roleComponents[role as Role] ?? 'div';
}
