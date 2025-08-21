import { ScrollView, StyleSheet } from 'react-native';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Text } from '~/components/ui/text';

export default function DialogScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Text>Edit Profile</Text>
          </Button>
        </DialogTrigger>
        <DialogContent style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>OK</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dialogContent: {
    maxWidth: 425,
  },
});
