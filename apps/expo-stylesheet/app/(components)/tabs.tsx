import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';

export default function TabsScreen() {
  const [value, setValue] = React.useState('account');

  return (
    <View style={styles.container}>
      <Tabs value={value} onValueChange={setValue} style={styles.tabs}>
        <TabsList style={styles.tabsList}>
          <TabsTrigger value='account' style={{ flex: 1 }}>
            <Text>Account</Text>
          </TabsTrigger>
          <TabsTrigger value='password' style={{ flex: 1 }}>
            <Text>Password</Text>
          </TabsTrigger>
        </TabsList>

        {/* Account tab */}
        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <View style={styles.inputGroup}>
                <Label nativeID='name'>Name</Label>
                <Input aria-labelledby='name' defaultValue='Pedro Duarte' />
              </View>
              <View style={styles.inputGroup}>
                <Label nativeID='username'>Username</Label>
                <Input id='username' defaultValue='@peduarte' />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Save changes</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Password tab */}
        <TabsContent value='password'>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent style={styles.cardContent}>
              <View style={styles.inputGroup}>
                <Label nativeID='current'>Current password</Label>
                <Input placeholder='********' aria-labelledby='current' secureTextEntry />
              </View>
              <View style={styles.inputGroup}>
                <Label nativeID='new'>New password</Label>
                <Input placeholder='********' aria-labelledby='new' secureTextEntry />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Save password</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  tabs: {
    width: '100%',
    maxWidth: 400,
    marginHorizontal: 'auto',
    flexDirection: 'column',
    gap: 6,
  },
  tabsList: {
    flexDirection: 'row',
    width: '100%',
  },
  cardContent: {
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
});
