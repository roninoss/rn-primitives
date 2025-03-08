import { useWebPressableProps } from '@rn-primitives/utils';
import * as React from 'react';
import type { PressableProps as RNPressableProps } from 'react-native';

type HtmlComponentProps<T extends PressableProps['role']> = React.ComponentPropsWithoutRef<
  T extends Role ? (typeof roleComponents)[Role] : 'div'
>;
type HtmlComponentRef<T extends PressableProps['role']> = React.Ref<
  T extends Role ? HTMLElementTagNameMap[(typeof roleComponents)[T]] : HTMLButtonElement
>;

type PressableWebProps<T extends PressableProps['role']> = PressableProps & {
  role?: T extends Role ? (typeof roleComponents)[Role] : 'button';
  web?: HtmlComponentProps<T>;
  native?: any;
};

// TODO: type props an share with native universal + use native and web props
function Pressable<T extends PressableProps['role']>(
  { native: _native, web, role = 'button', ...props }: PressableWebProps<T>,
  ref: HtmlComponentRef<T>
) {
  const { children, events, style } = useWebPressableProps({
    styleProp: props.style,
    childrenProp: props.children,
    webProps: web,
    onPressInProp: props.onPressIn,
    onPressOutProp: props.onPressOut,
  });

  const mappedProps = mapPressableToButtonProps({ ...props });
  const Component = getComponent(role);

  return (
    // @ts-ignore
    <Component ref={ref} {...mappedProps} children={children} style={style} {...web} {...events} />
  );
}

export { Pressable };

type PressableProps = Pick<
  RNPressableProps,
  | 'style'
  | 'children'
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
> & {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

function mapPressableToButtonProps<T extends PressableProps['role']>(
  pressableProps: PressableProps
): React.HTMLAttributes<
  T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : HTMLDivElement
> {
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
    onPress?.();
  };

  const handlePressIn = () => {
    if (disabled) return;
    onPressIn?.();
  };

  const handlePressOut = () => {
    if (disabled) return;
    onPressOut?.();
  };

  const props: React.HTMLAttributes<
    T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : HTMLDivElement
  > = {};

  if (role === 'button') {
    (props as React.ButtonHTMLAttributes<HTMLButtonElement>).type = 'button';
  }

  if (disabled) {
    (props as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled = true;
  }

  if (onPress) {
    props.onClick = handlePress;
  }

  if (onPressIn) {
    props.onMouseDown = handlePressIn;
    props.onTouchStart = handlePressIn;
  }

  if (onPressOut) {
    props.onMouseUp = handlePressOut;
    props.onTouchEnd = handlePressOut;
  }

  if (ariaLabel) {
    props['aria-label'] = ariaLabel;
  }

  if (ariaBusy) {
    props['aria-busy'] = ariaBusy;
  }

  if (ariaChecked) {
    props['aria-checked'] = ariaChecked;
  }

  if (ariaExpanded) {
    props['aria-expanded'] = ariaExpanded;
  }

  if (ariaHidden) {
    props['aria-hidden'] = ariaHidden;
  }

  if (ariaSelected) {
    props['aria-selected'] = ariaSelected;
  }

  if (ariaLabelledby) {
    props['aria-labelledby'] = ariaLabelledby;
  }

  if (ariaLive) {
    props['aria-live'] = ariaLive;
  }

  if (ariaModal) {
    props['aria-modal'] = ariaModal;
  }

  const accessibilityRole = role ?? 'button';

  // Only set role if it's not the default 'button'
  if (role && role !== 'button') {
    props.role = accessibilityRole;
  }

  return props;
}

const roleComponents = {
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
} as const;

type Role = keyof typeof roleComponents;

function getComponent(role: Role | string) {
  if (role === 'button') {
    return 'button';
  }

  return role in roleComponents ? roleComponents[role as Role] : 'div';
}
