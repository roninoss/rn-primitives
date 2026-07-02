import * as React from 'react';
import { AccessibilityInfo, findNodeHandle } from 'react-native';

/**
 * Moves screen reader (VoiceOver/TalkBack) focus to the attached element when `enabled`
 * becomes true. No-op when no screen reader is running.
 *
 * Attach the returned ref to the container of the content that should receive focus
 * (e.g. an opened dialog, menu, or popover content). The target must NOT be
 * `accessible={true}` — collapsing the container into a single accessibility element
 * would make its children unselectable by the screen reader. When the target is a
 * plain (non-accessible) container, focus lands on its first accessible descendant.
 */
export function useAccessibilityFocus<T>(enabled: boolean = true) {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }
    // Small delay so the view is mounted and mounting animations have started;
    // setting focus synchronously on mount is unreliable on both platforms.
    const timeout = setTimeout(() => {
      const node = findNodeHandle(ref.current as React.Component | null);
      if (node != null) {
        AccessibilityInfo.setAccessibilityFocus(node);
      }
    }, 50);
    return () => {
      clearTimeout(timeout);
    };
  }, [enabled]);

  return ref;
}
