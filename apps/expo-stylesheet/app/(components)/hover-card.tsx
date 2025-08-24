import * as React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { Text } from '~/components/ui/text';
import { CalendarDays } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

export default function HoverCardScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof HoverCardTrigger>>(null);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme() as ICustomTheme;
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
      <HoverCard>
        <HoverCardTrigger ref={triggerRef} asChild>
          <Button variant='link' size='lg'>
            <Text style={{ color: colors.primary }}>@nextjs</Text>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent insets={contentInsets} style={styles.cardContent}>
          <View style={styles.row}>
            <Avatar alt='Vercel avatar'>
              <AvatarImage source={{ uri: 'https://github.com/vercel.png' }} />
              <AvatarFallback>
                <Text>VA</Text>
              </AvatarFallback>
            </Avatar>
            <View style={styles.userInfo}>
              <Text style={styles.username}>@nextjs</Text>
              <Text style={styles.description}>
                The React Framework – created and maintained by @vercel.
              </Text>
              <View style={styles.joinedRow}>
                <CalendarDays size={14} color={colors.mutedText} />
                <Text style={[styles.joinedText, { color: colors.mutedText }]}>
                  Joined December 2021
                </Text>
              </View>
            </View>
          </View>
        </HoverCardContent>
      </HoverCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 48,
  },
  floatingButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 64,
    height: 64,
  },
  cardContent: {
    width: 320,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  userInfo: {
    flex: 1,
    gap: 4,
  },
  username: {
    fontSize: 14,
    fontWeight: 600,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  joinedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    gap: 8,
  },
  joinedText: {
    fontSize: 12,
  },
});
