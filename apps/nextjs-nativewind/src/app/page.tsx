import { CheckboxExample } from '~/components/CheckboxExample';
import { CollapsibleExample } from '~/components/CollapsibleExample';
import { ContextMenuExample } from '~/components/ContextMenuExample';
import { MenubarExample } from '~/components/MenubarExample';
import { NavigationMenuExample } from '~/components/NavigationMenuExample';
import { RadioGroupExample } from '~/components/RadioGroupExample';
import { SliderExample } from '~/components/SliderExample';
import { SwitchExample } from '~/components/SwitchExample';
import { TabsExample } from '~/components/TabsExample';
import { ToggleExample } from '~/components/ToggleExample';
import { ToggleGroupExample } from '~/components/ToggleGroupExample';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Progress } from '~/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Separator } from '~/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import * as Typography from '~/components/ui/typography';
import {
  CalendarDays,
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  UserPlus,
  Users,
} from '~/lib/icons';

export default function Home() {
  return (
    <div className='py-24 px-4 min-h-svh'>
      <main className='mx-auto max-w-3xl w-full flex flex-col gap-12 '>
        <Typography.H1>@rnr-method</Typography.H1>
        <Typography.P className='font-medium'>
          Styled with{' '}
          <a className='hover:underline' href='https://www.nativewind.dev/v4/overview'>
            NativeWind
          </a>
        </Typography.P>
        <AccordionExample />
        <AlertDialogExample />
        <AspectRatioExample />
        <AvatarExample />
        <CheckboxExample />
        <CollapsibleExample />
        <ContextMenuExample />
        <DialogExample />
        <DropdownMenuExample />
        <HoverCardExample />
        <MenubarExample />
        <NavigationMenuExample />
        <PopoverExample />
        <Progress value={50} />
        <RadioGroupExample />
        <SelectExample />
        <Separator />
        <SliderExample />
        <SwitchExample />
        <TableExample />
        <TabsExample />
        <ToggleExample />
        <ToggleGroupExample />
        <TooltipExample />
      </main>
    </div>
  );
}

function AccordionExample() {
  return (
    <Accordion type='multiple' collapsible defaultValue={['item-1']}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <Text>Is it accessible?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>
          <Text>What are universal components?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>
            In the world of React Native, universal components are components that work on both web
            and native platforms.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>
          <Text>Is this component universal?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Yes. Try it out on the web, iOS, and/or Android.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>
          <Text>Show Alert Dialog</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Text>Continue</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function AspectRatioExample() {
  return (
    <AspectRatio ratio={16 / 9}>
      <div className='bg-blue-500 h-full w-full rounded-lg flex flex-col gap-2 justify-center items-center'>
        <Typography.H1 className='text-white'>16:9</Typography.H1>
        <Typography.Small className='text-white'>Aspect-ratio</Typography.Small>
      </div>
    </AspectRatio>
  );
}

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

function AvatarExample() {
  return (
    <Avatar alt="Zach Nugent's Avatar">
      <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
      <AvatarFallback>
        <Text>ZN</Text>
      </AvatarFallback>
    </Avatar>
  );
}

function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Text>Edit Profile</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
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
  );
}

function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Text>Open</Text>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64 native:w-72'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className='text-foreground' size={14} />
            <Text>Team</Text>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className='text-foreground' size={14} />
              <Text>Invite users</Text>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Mail className='text-foreground' size={14} />
                <Text>Email</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className='text-foreground' size={14} />
                <Text>Message</Text>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className='text-foreground' size={14} />
                <Text>More...</Text>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className='text-foreground' size={14} />
            <Text>New Team</Text>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className='text-foreground' size={14} />
          <Text>GitHub</Text>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className='text-foreground' size={14} />
          <Text>Support</Text>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className='text-foreground' size={14} />
          <Text>API</Text>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='text-foreground' size={14} />
          <Text>Log out</Text>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HoverCardExample() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link' size='lg'>
          <Text>@nextjs</Text>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80 native:w-96'>
        <div className='flex flex-row justify-between gap-4'>
          <Avatar alt='Vercel avatar'>
            <AvatarImage source={{ uri: 'https://github.com/vercel.png' }} />
            <AvatarFallback>
              <Text>VA</Text>
            </AvatarFallback>
          </Avatar>
          <div className='gap-1 flex-1'>
            <Text className='text-sm native:text-base font-semibold block'>@nextjs</Text>
            <Text className='text-sm native:text-base'>
              The React Framework – created and maintained by @vercel.
            </Text>
            <div className='flex flex-row items-center pt-2 gap-2'>
              <CalendarDays size={14} className='text-foreground opacity-70' />
              <Text className='text-xs native:text-sm text-muted-foreground'>
                Joined December 2021
              </Text>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <Text>Open popover</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='web:grid gap-4'>
          <div className='space-y-2'>
            <Text className='font-medium leading-none native:text-xl block'>Dimensions</Text>
            <Text className='text-sm text-muted-foreground'>Set the dimensions for the layer.</Text>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SelectExample() {
  return (
    <Select defaultValue={{ value: 'apple', label: 'Apple' }} className='z-10'>
      <SelectTrigger>
        <SelectValue
          className='text-foreground text-sm native:text-lg'
          placeholder='Select a fruit'
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem label='Apple' value='apple'>
            Apple
          </SelectItem>
          <SelectItem label='Banana' value='banana'>
            Banana
          </SelectItem>
          <SelectItem label='Blueberry' value='blueberry'>
            Blueberry
          </SelectItem>
          <SelectItem label='Grapes' value='grapes'>
            Grapes
          </SelectItem>
          <SelectItem label='Pineapple' value='pineapple'>
            Pineapple
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function TooltipExample() {
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <Button variant='outline'>
          <Text>Hover me</Text>
        </Button>
      </TooltipTrigger>
      <TooltipContent className='p-24'>
        <Text className='native:text-lg'>Add to library</Text>
      </TooltipContent>
    </Tooltip>
  );
}

function TableExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Text>Head</Text>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Text>Cell</Text>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>
            <Text>Footer</Text>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
