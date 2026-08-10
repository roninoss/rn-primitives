import { View, StyleSheet } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function AvatarScreen() {
  return (
    <View style={styles.container}>
      <Avatar alt="Zach Nugent's Avatar">
        <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24, // p-6
    gap: 48, // gap-12
  },
});
