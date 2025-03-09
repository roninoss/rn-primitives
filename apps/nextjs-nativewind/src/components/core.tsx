import { Text, Platform } from '@rn-primitives/core/web';

export function Core() {
  return <Text role='paragraph'>{Platform.select({ ios: 'iOS', web: 'Web' })}</Text>;
}
