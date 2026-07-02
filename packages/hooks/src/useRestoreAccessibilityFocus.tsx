import * as React from 'react';
import { AccessibilityInfo, findNodeHandle, Platform } from 'react-native';

/**
 * Restores screen-reader focus to `ref` when `open` transitions from
 * true -> false. Pairs with useAccessibilityFocus, which moves focus INTO
 * content on open but never restores it on close, leaving VoiceOver/TalkBack
 * focus stranded on the root view after the overlay unmounts.
 */
export function useRestoreAccessibilityFocus(open: boolean, ref: React.RefObject<unknown>) {
  const wasOpenRef = React.useRef(open);
  React.useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = open;
    if (Platform.OS === 'web' || !wasOpen || open) {
      return;
    }
    const node = ref.current ? findNodeHandle(ref.current as any) : null;
    if (node == null) {
      return;
    }
    // Let the content finish unmounting before moving focus back.
    const timeout = setTimeout(() => AccessibilityInfo.setAccessibilityFocus(node), 50);
    return () => clearTimeout(timeout);
  }, [open, ref]);
}
