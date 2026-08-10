import { useTheme } from '@react-navigation/native';
import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text style={{ color: colors.text }}>This screen doesn&apos;t exist.</Text>

        <Link href='/'>
          <Text style={{ color: colors.text }}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
