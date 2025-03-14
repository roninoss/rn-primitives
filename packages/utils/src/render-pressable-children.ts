import type { PressableProps, PressableStateCallbackType } from 'react-native';

function renderPressableChildren(
  children: PressableProps['children'],
  render: (children: React.ReactNode, state?: PressableStateCallbackType) => React.ReactNode
) {
  return typeof children === 'function'
    ? (state: PressableStateCallbackType) => render(children(state), state)
    : render.length > 1 //  the `state` argument is provided
    ? (state: PressableStateCallbackType) => render(children, state)
    : render(children);
}

export { renderPressableChildren };
