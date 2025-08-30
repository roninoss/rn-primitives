import * as SelectPrimitive from '@rn-primitives/select';
import * as React from 'react';
import { Platform, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Check } from '~/lib/icons/Check';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { ChevronUp } from '~/lib/icons/ChevronUp';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ style, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {({ pressed }) => (
      <View
        style={StyleSheet.flatten([
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'rgb(229, 231, 235)',
            backgroundColor: 'rgb(255, 255, 255)',
            paddingHorizontal: 12,
            paddingVertical: 8,
            height: 40,
            opacity: pressed || props.disabled ? 0.5 : 1,
          },
          style as StyleProp<ViewStyle>,
        ])}
      >
        <>{children}</>
        <ChevronDown size={16} aria-hidden={true} color='rgba(0,0,0,0.5)' />
      </View>
    )}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * Platform: WEB ONLY
 */
const SelectScrollUpButton = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>) => {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton {...props}>
      <ChevronUp size={14} color='black' />
    </SelectPrimitive.ScrollUpButton>
  );
};

/**
 * Platform: WEB ONLY
 */
const SelectScrollDownButton = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>) => {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton {...props}>
      <ChevronDown size={14} color='black' />
    </SelectPrimitive.ScrollDownButton>
  );
};

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { portalHost?: string }
>(({ style, children, position = 'popper', portalHost, ...props }, ref) => {
  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <SelectPrimitive.Content
            ref={ref}
            style={StyleSheet.flatten([
              {
                position: 'relative',
                zIndex: 50,
                maxWidth: 96 * 4,
                minWidth: 8 * 4,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: 'rgb(229, 231, 235)',
                backgroundColor: 'rgb(255, 255, 255)',
                paddingHorizontal: 4,
                paddingVertical: 8,
              },
              style,
            ])}
            position={position}
            {...props}
          >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              className={
                position === 'popper'
                  ? 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                  : ''
              }
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  }

SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ style, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    style={StyleSheet.flatten([
      {
        paddingVertical: 6,
        paddingBottom: 8,
        paddingLeft: 36,
        paddingRight: 8,
        fontWeight: '600',
      },
      style,
    ])}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ style, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    style={StyleSheet.flatten([
      {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderRadius: 4,
        paddingVertical: 8,
        paddingLeft: 36,
        paddingRight: 8,
      },
      style as StyleProp<ViewStyle>,
    ])}
    {...props}
  >
    <View
      style={{
        position: 'absolute',
        left: 2.5 * 4,
        paddingTop: 1,
        width: 3.5 * 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SelectPrimitive.ItemIndicator>
        <Check size={16} strokeWidth={3} color='black' />
      </SelectPrimitive.ItemIndicator>
    </View>
    <SelectPrimitive.ItemText />
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ style, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    style={StyleSheet.flatten([
      {
        marginHorizontal: -4,
        marginVertical: 4,
        backgroundColor: 'rgb(229, 231, 235)',
      },
      style,
    ])}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
