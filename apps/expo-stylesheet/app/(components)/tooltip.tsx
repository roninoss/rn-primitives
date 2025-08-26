import * as React from 'react';
import { Platform, Pressable, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

export default function TooltipScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof TooltipTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.floatingButton}
        onPress={() => {
          // open programmatically
          triggerRef.current?.open();
        }}
      />
      <Tooltip delayDuration={150}>
        <TooltipTrigger ref={triggerRef} asChild>
          <Button variant='outline'>
            <Text>{Platform.OS === 'web' ? 'Hover me' : 'Press me'}</Text>
          </Button>
        </TooltipTrigger>
        <TooltipContent insets={contentInsets}>
          <Text style={styles.tooltipText}>Add to library</Text>
        </TooltipContent>
      </Tooltip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  floatingButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 64,
    height: 64,
  },
  tooltipText: {
    fontSize: 16,
  },
});
