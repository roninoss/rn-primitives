import type { PressableProps, PressableStateCallbackType } from 'react-native';

function renderPressableChildren(
  children: PressableProps['children'],
  render: (children: React.ReactNode) => React.ReactNode
) {
  return typeof children === 'function'
    ? (state: PressableStateCallbackType) => render(children(state))
    : render(children);
}

export { renderPressableChildren };
