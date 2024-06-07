import * as React from 'react';
import { Platform, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenu,
  ContextMenuSub,
  ContextMenuTrigger,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from '~/components/ui/context-menu';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <ContextMenuExample>
        <Card className='w-full max-w-sm p-6 rounded-2xl'>
          <CardHeader className='items-center'>
            <Avatar alt="Rick Sanchez's Avatar" className='w-24 h-24'>
              <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
              <AvatarFallback>
                <Text>RS</Text>
              </AvatarFallback>
            </Avatar>
            <View className='p-3' />
            <CardTitle className='pb-2 text-center'>Rick Sanchez</CardTitle>
            <View className='flex-row'>
              <CardDescription className='text-base font-semibold'>Scientist</CardDescription>
              <Tooltip delayDuration={150}>
                <TooltipTrigger className='px-2 pb-0.5 active:opacity-50'>
                  <Info size={14} strokeWidth={2.5} className='w-4 h-4 text-foreground/70' />
                </TooltipTrigger>
                <TooltipContent className='py-2 px-4 shadow'>
                  <Text className='native:text-lg'>Freelance</Text>
                </TooltipContent>
              </Tooltip>
            </View>
          </CardHeader>
          <CardContent>
            <View className='flex-row justify-around gap-3'>
              <View className='items-center'>
                <Text className='text-sm text-muted-foreground'>Dimension</Text>
                <Text className='text-xl font-semibold'>C-137</Text>
              </View>
              <View className='items-center'>
                <Text className='text-sm text-muted-foreground'>Age</Text>
                <Text className='text-xl font-semibold'>70</Text>
              </View>
              <View className='items-center'>
                <Text className='text-sm text-muted-foreground'>Species</Text>
                <Text className='text-xl font-semibold'>Human</Text>
              </View>
            </View>
          </CardContent>
          <CardFooter className='flex-col gap-3 pb-0'>
            <View className='flex-row items-center overflow-hidden'>
              <Text className='text-sm text-muted-foreground'>Productivity:</Text>
              <LayoutAnimationConfig skipEntering>
                <Animated.View
                  key={progress}
                  entering={FadeInUp}
                  exiting={FadeOutDown}
                  className='w-11 items-center'
                >
                  <Text className='text-sm font-bold text-sky-600'>{progress}%</Text>
                </Animated.View>
              </LayoutAnimationConfig>
            </View>
            <Progress value={progress} className='h-2' indicatorClassName='bg-sky-600' />
            <View />
            <Button
              variant='outline'
              className='shadow shadow-foreground/5'
              onPress={updateProgressValue}
            >
              <Text>Update</Text>
            </Button>
          </CardFooter>
        </Card>
      </ContextMenuExample>
    </View>
  );
}

function ContextMenuExample({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [subCheckboxValue, setSubCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('pedro');

  return (
    <ContextMenu
      open={open}
      onOpenChange={(newVal) => {
        setOpen(newVal);
        if (!newVal) {
          setOpenSub(false);
        }
      }}
      className='w-full pb-20'
    >
      <Text className='text-center pb-2 opacity-50 font-bold text-sm'>Long Press The Card</Text>
      <ContextMenuTrigger className='w-full items-center'>{children}</ContextMenuTrigger>

      <ContextMenuContent align='start' insets={contentInsets} className='w-64 native:w-72'>
        <ContextMenuItem inset>
          <Text>Back</Text>
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          <Text>Forward</Text>
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          <Text>Reload</Text>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub open={openSub} onOpenChange={setOpenSub}>
          <ContextMenuSubTrigger inset>
            <Text>More Tools</Text>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className='web:w-48 native:mt-1'>
            <Animated.View entering={FadeIn.duration(200)}>
              <ContextMenuItem>
                <Text>Save Page As...</Text>
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Text>Create Shortcut...</Text>
              </ContextMenuItem>

              <ContextMenuSeparator />
              <ContextMenuItem>
                <Text>Developer Tools</Text>
              </ContextMenuItem>
            </Animated.View>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={checkboxValue}
          onCheckedChange={setCheckboxValue}
          closeOnPress={false}
        >
          <Text>Show Bookmarks Bar</Text>
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={subCheckboxValue}
          onCheckedChange={setSubCheckboxValue}
          closeOnPress={false}
        >
          <Text>Show Full URLs</Text>
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={radioValue} onValueChange={setRadioValue}>
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value='pedro' closeOnPress={false}>
            <Text>Elmer Fudd</Text>
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value='colm' closeOnPress={false}>
            <Text>Foghorn Leghorn</Text>
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
