import * as React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { Button } from '~/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';

export default function CollapsibleScreen() {
  const [open, setOpen] = React.useState(false);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Collapsible asChild open={open} onOpenChange={setOpen}>
        <Animated.View layout={Platform.OS !== 'web' ? LinearTransition : undefined}>
          <View style={styles.contentWrapper}>
            <View style={styles.header}>
              <Text style={[styles.headerText, { color: colors.text }]}>
                @peduarte starred 3 repositories
              </Text>
              <CollapsibleTrigger asChild>
                <Button variant='ghost' size='icon'>
                  {open ? (
                    <ChevronsDownUp size={16} color={colors.text} />
                  ) : (
                    <ChevronsUpDown size={16} color={colors.text} />
                  )}
                  <Text style={styles.srOnly}>Toggle</Text>
                </Button>
              </CollapsibleTrigger>
            </View>

            <View style={[styles.card, { borderColor: colors.border }]}>
              <Text style={[styles.cardText, { color: colors.text }]}>@radix-ui/primitives</Text>
            </View>

            <CollapsibleContent style={styles.collapsibleContent}>
              <CollapsibleItem delay={100}>@radix-ui/react</CollapsibleItem>
              <CollapsibleItem delay={200}>@stitches/core</CollapsibleItem>
            </CollapsibleContent>
          </View>
        </Animated.View>
      </Collapsible>
    </View>
  );
}

function CollapsibleItem({ children, delay }: { children: string; delay: number }) {
  const { colors } = useTheme();

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.card, { borderColor: colors.border }]}>
        <Text style={[styles.cardText, { color: colors.text }]}>{children}</Text>
      </View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(200).delay(delay)}
      style={[styles.card, { borderColor: colors.border }]}
    >
      <Text style={[styles.cardText, { color: colors.text }]}>{children}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 350,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: Platform.OS === 'web' ? 14 : 16,
    fontWeight: '600',
  },
  card: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardText: {
    fontSize: Platform.OS === 'web' ? 14 : 16,
    lineHeight: 20,
  },
  collapsibleContent: {
    gap: 8,
  },
  srOnly: {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    borderWidth: 0,
    overflow: 'hidden',
  },
});
