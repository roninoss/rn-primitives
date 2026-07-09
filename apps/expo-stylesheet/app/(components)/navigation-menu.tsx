import { ViewRef } from '@rn-primitives/types';
import { useNavigation } from 'expo-router';
import * as React from 'react';
import { Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { Text } from '~/components/ui/text';
import { Sparkles } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { ICustomTheme } from '~/lib/constants';

export default function NavigationMenuScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme() as ICustomTheme;
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [value, setValue] = React.useState<string>();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isMediumOrAboveScreen = width >= 768;

  function closeAll() {
    setValue('');
  }

  React.useEffect(() => {
    const sub = navigation.addListener('blur', () => {
      closeAll();
    });

    return sub;
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' && !!value && (
        <Pressable
          onPress={() => {
            setValue('');
          }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <NavigationMenu value={value} onValueChange={setValue}>
        <NavigationMenuList>
          <NavigationMenuItem value='getting-started'>
            <NavigationMenuTrigger>
              <Text>Getting started</Text>
            </NavigationMenuTrigger>
            <NavigationMenuContent insets={contentInsets}>
              <View role='list' style={styles.menuContent}>
                <View
                  role='listitem'
                  style={[styles.featureCardWrapper, { backgroundColor: colors.buttonSecondary }]}
                >
                  <NavigationMenuLink>
                    <View style={[styles.featureCard, { borderColor: colors.border }]}>
                      <Sparkles size={16} color={colors.text} />
                      <Text style={styles.featureTitle}>react-native-reusables</Text>
                      <Text style={[styles.featureDescription, { color: colors.mutedText }]}>
                        Universal components that you can copy and paste into your apps. Accessible.
                        Customizable. Open Source.
                      </Text>
                    </View>
                  </NavigationMenuLink>
                </View>
                <ListItem href='/docs' title='Introduction'>
                  Re-usable components built using Radix UI on the web and Tailwind CSS.
                </ListItem>
                <ListItem href='/docs/installation' title='Installation'>
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href='/docs/primitives/typography' title='Typography'>
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </View>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value='components'>
            <NavigationMenuTrigger>
              <Text style={{ color: colors.text }}>Components</Text>
            </NavigationMenuTrigger>
            <NavigationMenuContent insets={contentInsets}>
              <View
                role='list'
                style={[styles.componentsGrid, { width: isMediumOrAboveScreen ? 600 : 360 }]}
              >
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </View>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value='documentation'>
            <NavigationMenuLink onPress={closeAll} style={navigationMenuTriggerStyle}>
              <Text>Documentation</Text>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </View>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/alert-dialog/alert-dialog-universal',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/hover-card/hover-card-universal',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/progress/progress-universal',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/scroll-area/scroll-area-universal',
    description:
      'Visually or semantically separates content. Typically used to create a scrollable area.',
  },
  {
    title: 'Tabs',
    href: '/tabs/tabs-universal',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/tooltip/tooltip-universal',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

const ListItem = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & { title: string; href: string }
>(({ title, children, style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const { width } = useWindowDimensions();
  const isMediumOrAboveScreen = width >= 768;

  return (
    <View role='listitem'>
      <NavigationMenuLink
        ref={ref}
        style={[styles.listItem, { width: isMediumOrAboveScreen ? 268 : '100%' }, style]}
        {...props}
      >
        <Text style={[styles.listItemTitle, { color: colors.text }]}>{title}</Text>
        <Text numberOfLines={2} style={[styles.listItemDescription, { color: colors.mutedText }]}>
          {children}
        </Text>
      </NavigationMenuLink>
    </View>
  );
});
ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 48,
  },
  menuContent: {
    gap: 12,
    padding: 20,
  },
  featureCardWrapper: {
    flex: 1,
  },
  featureCard: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderRadius: 6,
    padding: 24,
    borderWidth: 1,
  },
  featureTitle: {
    marginBottom: 8,
    marginTop: 16,
    fontSize: 20,
    fontWeight: '500',
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  componentsGrid: {
    gap: 12,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  listItem: {
    width: 268,
    gap: 4,
    borderRadius: 6,
    padding: 12,
    textDecorationLine: 'none',
  },
  listItemTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  listItemDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
