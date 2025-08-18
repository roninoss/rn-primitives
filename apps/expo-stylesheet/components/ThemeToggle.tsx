import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, View, StyleSheet } from 'react-native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { MoonStar, Sun } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { useTheme } from '@react-navigation/native';

export function ThemeToggle() {
  const { colors } = useTheme();
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDarkColorScheme = colorScheme === 'dark';

  return (
    <Pressable
      onPress={() => {
        const newTheme = isDarkColorScheme ? 'light' : 'dark';
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem('theme', newTheme);
      }}
    >
      {({ pressed }) => (
        <View style={[styles.iconContainer, pressed && styles.iconPressed]}>
          {isDarkColorScheme ? (
            <MoonStar color={colors.text} size={23} strokeWidth={1.25} />
          ) : (
            <Sun color={colors.text} size={24} strokeWidth={1.25} />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    paddingTop: 2, // 0.5 * 4 from Tailwind
    justifyContent: 'center',
    alignItems: 'flex-start',
    // paddingHorizontal: 20, // web:px-5 (5 * 4px)
  },
  iconPressed: {
    opacity: 0.7,
  },
});
