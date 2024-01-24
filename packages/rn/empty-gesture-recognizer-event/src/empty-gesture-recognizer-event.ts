import type { GestureResponderEvent } from 'react-native';

const EmptyGestureResponderEvent: GestureResponderEvent = {
  nativeEvent: {
    changedTouches: [],
    identifier: '0',
    locationX: 0,
    locationY: 0,
    pageX: 0,
    pageY: 0,
    target: '0',
    timestamp: 0,
    touches: [],
  },
  bubbles: false,
  cancelable: false,
  currentTarget: 0,
  defaultPrevented: false,
  eventPhase: 0,
  persist: () => {},
  isDefaultPrevented: () => false,
  isPropagationStopped: () => false,
  isTrusted: false,
  preventDefault: () => {},
  stopPropagation: () => {},
  target: 0,
  timeStamp: 0,
  type: '',
};

export { EmptyGestureResponderEvent };
