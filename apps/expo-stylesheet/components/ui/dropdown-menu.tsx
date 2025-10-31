import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import * as React from 'react';
import { Platform, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Check, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { TextClassContext } from '~/components/ui/text';
import { ICustomTheme } from '~/lib/constants';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
    style?: StyleProp<ViewStyle>;
  }
>(({ inset, children, style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const { open } = DropdownMenuPrimitive.useSubContext();
  const Icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  const nativeStyle = ({ pressed }: { pressed: boolean }) => [
    styles.item,
    { backgroundColor: open ? colors.accent : 'transparent' },
    inset && { paddingLeft: 32 },
    pressed && { backgroundColor: colors.accent },
    style,
  ];
  const webStyle = StyleSheet.flatten([
    styles.item,
    { backgroundColor: open ? colors.accent : 'transparent' },
    inset && { paddingLeft: 32 },
    style,
  ]);

  return (
    <TextClassContext.Provider
      value={{ color: colors.text, fontSize: Platform.OS === 'web' ? 14 : 16 }}
    >
      <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        style={Platform.OS === 'web' ? webStyle : nativeStyle}
        {...props}
      >
        <>{children}</>
        <Icon size={18} color={colors.text} style={{ marginLeft: 'auto' }} />
      </DropdownMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      style={[
        styles.content,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
          shadowColor: colors.text,
        },
        style,
      ]}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    overlayStyle?: StyleProp<ViewStyle>;
    portalHost?: string;
  }
>(({ overlayStyle, portalHost, style, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenContentStyles = StyleSheet.flatten([
    styles.content,
    {
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.text,
    },
    style,
  ]);

  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <DropdownMenuPrimitive.Overlay
        style={[Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined, overlayStyle]}
      >
        <DropdownMenuPrimitive.Content ref={ref} style={flattenContentStyles} {...props} />
      </DropdownMenuPrimitive.Overlay>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    style?: StyleProp<ViewStyle>;
  }
>(({ inset, style, disabled, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const nativeStyle = ({ pressed }: { pressed: boolean }) => [
    styles.item,
    inset && { paddingLeft: 32 },
    disabled && { opacity: 0.5 },
    pressed && { backgroundColor: colors.accent },
    style,
  ];
  const webStyle = StyleSheet.flatten([
    styles.item,
    inset && { paddingLeft: 32 },
    disabled && { opacity: 0.5 },
    style,
  ]);

  return (
    <TextClassContext.Provider
      value={{
        fontSize: Platform.OS === 'web' ? 14 : 16,
        lineHeight: Platform.OS === 'web' ? 22 : 28,
        color: colors.text,
      }}
    >
      <DropdownMenuPrimitive.Item
        ref={ref}
        style={Platform.OS === 'web' ? webStyle : nativeStyle}
        disabled={disabled}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ children, checked, style, disabled, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      disabled={disabled}
      style={({ pressed }) => [
        styles.checkboxItem,
        disabled && { opacity: 0.5 },
        pressed && { backgroundColor: colors.accent },
        style,
      ]}
      {...props}
    >
      <View style={styles.iconWrapper}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check size={14} strokeWidth={3} color={colors.text} />
        </DropdownMenuPrimitive.ItemIndicator>
      </View>
      <>{children}</>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ children, style, disabled, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      disabled={disabled}
      style={({ pressed }) => [
        styles.radioItem,
        disabled && { opacity: 0.5 },
        pressed && { backgroundColor: colors.accent },
        style,
      ]}
      {...props}
    >
      <View style={styles.iconWrapper}>
        <DropdownMenuPrimitive.ItemIndicator>
          <View
            style={{
              backgroundColor: colors.text,
              height: 8,
              width: 8,
              borderRadius: 9999,
            }}
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </View>
      <>{children}</>
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ inset, style, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenStyle: TextStyle = StyleSheet.flatten([
    {
      paddingHorizontal: 8,
      paddingVertical: 6,
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    inset && { paddingLeft: 32 },
    style,
  ]);

  return <DropdownMenuPrimitive.Label ref={ref} style={flattenStyle} {...props} />;
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const flattenStyle = StyleSheet.flatten([
    {
      marginHorizontal: -4,
      marginVertical: 4,
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.borderMedium,
    },
    style,
  ]);

  return <DropdownMenuPrimitive.Separator ref={ref} style={flattenStyle} {...props} />;
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = (props: React.ComponentPropsWithoutRef<typeof Text>) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <Text
      {...props}
      style={[
        {
          marginLeft: 'auto',
          fontSize: 12,
          letterSpacing: 1,
          color: colors.mutedText,
        },
        props.style,
      ]}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};

const styles = StyleSheet.create({
  content: {
    zIndex: 50,
    minWidth: 128,
    overflow: 'hidden',
    borderRadius: 6,
    borderWidth: 1,
    padding: 4,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  item: {
    position: 'relative',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  checkboxItem: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    paddingVertical: 6,
    paddingLeft: 32,
    paddingRight: 8,
  },
  radioItem: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    paddingVertical: 6,
    paddingLeft: 32,
    paddingRight: 8,
  },
  iconWrapper: {
    position: 'absolute',
    left: 8,
    height: 14,
    width: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
