import * as MenubarPrimitive from '@rn-primitives/menubar';
import * as React from 'react';
import { Platform, Text, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Check, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react-native';
import { useTheme } from '@react-navigation/native';
import { TextClassContext } from '~/components/ui/text';
import { ICustomTheme } from '~/lib/constants';

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <MenubarPrimitive.Root
      ref={ref}
      style={[
        styles.root,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
      {...props}
    />
  );
});
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ style, ...props }, ref) => {
  const { value } = MenubarPrimitive.useRootContext();
  const { value: itemValue } = MenubarPrimitive.useMenuContext();
  const { colors } = useTheme() as ICustomTheme;
  const isActive = value === itemValue;
  const nativeStyle = ({ pressed }: { pressed: boolean }) => [
    styles.trigger,
    { backgroundColor: isActive ? colors.accent : 'transparent' },
    pressed && { backgroundColor: colors.accent },
    style,
  ];
  const webStyle = StyleSheet.flatten([
    styles.trigger,
    { backgroundColor: isActive ? colors.accent : 'transparent' },
    style,
  ]);

  return (
    <TextClassContext.Provider value={{ fontSize: Platform.OS === 'web' ? 16 : 14 }}>
      <MenubarPrimitive.Trigger
        ref={ref}
        style={Platform.OS === 'web' ? webStyle : nativeStyle}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
    style?: StyleProp<ViewStyle>;
  }
>(({ inset, children, style, ...props }, ref) => {
  const { open } = MenubarPrimitive.useSubContext();
  const { colors } = useTheme() as ICustomTheme;
  const Icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  const nativeStyle = ({ pressed }: { pressed: boolean }) => [
    styles.subTrigger,
    { backgroundColor: open ? colors.accent : 'transparent' },
    inset && { paddingLeft: 32 },
    pressed && { backgroundColor: colors.accent },
    style,
  ];
  const webStyle = StyleSheet.flatten([
    styles.subTrigger,
    { backgroundColor: open ? colors.accent : 'transparent' },
    inset && { paddingLeft: 32 },
    style,
  ]);

  return (
    <TextClassContext.Provider
      value={{
        color: colors.text,
        fontSize: Platform.OS === 'web' ? 14 : 16,
      }}
    >
      <MenubarPrimitive.SubTrigger
        ref={ref}
        style={Platform.OS === 'web' ? webStyle : nativeStyle}
        {...props}
      >
        <>{children}</>
        <Icon size={18} color={colors.text} style={{ marginLeft: 'auto' }} />
      </MenubarPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
});
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      style={[
        styles.subContent,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
      {...props}
    />
  );
});
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> & {
    portalHost?: string;
  }
>(({ portalHost, style, ...props }, ref) => {
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
    <MenubarPrimitive.Portal hostName={portalHost}>
      <MenubarPrimitive.Content ref={ref} style={flattenContentStyles} {...props} />
    </MenubarPrimitive.Portal>
  );
});
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    style?: StyleProp<ViewStyle>;
  }
>(({ inset, style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const nativeStyle = ({ pressed }: { pressed: boolean }) => [
    styles.item,
    inset && { paddingLeft: 32 },
    props.disabled && { opacity: 0.5 },
    pressed && { backgroundColor: colors.accent },
    style,
  ];
  const webStyle = StyleSheet.flatten([
    styles.item,
    inset && { paddingLeft: 32 },
    props.disabled && { opacity: 0.5 },
    style,
  ]);

  return (
    <TextClassContext.Provider
      value={{
        fontSize: Platform.OS === 'web' ? 14 : 16,
        lineHeight: Platform.OS === 'web' ? 20 : 24,
      }}
    >
      <MenubarPrimitive.Item
        ref={ref}
        style={Platform.OS === 'web' ? webStyle : nativeStyle}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ children, checked, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const nativeStyle = ({ pressed }: { pressed: boolean }) => [
    styles.checkboxItem,
    props.disabled && { opacity: 0.5 },
    pressed && { backgroundColor: colors.accent },
  ];
  const webStyle = StyleSheet.flatten([styles.checkboxItem, props.disabled && { opacity: 0.5 }]);

  return (
    <TextClassContext.Provider value={{ fontSize: 14, lineHeight: 22 }}>
      <MenubarPrimitive.CheckboxItem
        ref={ref}
        style={Platform.OS === 'web' ? webStyle : nativeStyle}
        checked={checked}
        {...props}
      >
        <View style={styles.indicatorBox}>
          <MenubarPrimitive.ItemIndicator>
            <Check size={14} strokeWidth={3} color={colors.text} />
          </MenubarPrimitive.ItemIndicator>
        </View>
        <>{children}</>
      </MenubarPrimitive.CheckboxItem>
    </TextClassContext.Provider>
  );
});
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> & {
    style?: StyleProp<ViewStyle>;
  }
>(({ children, style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const nativeStyle = ({ pressed }: { pressed: boolean }) => [
    styles.radioItem,
    props.disabled && { opacity: 0.5 },
    pressed && { backgroundColor: colors.accent },
    style,
  ];
  const webStyle = StyleSheet.flatten([
    styles.radioItem,
    props.disabled && { opacity: 0.5 },
    style,
  ]);

  return (
    <TextClassContext.Provider value={{ fontSize: 14, lineHeight: 22 }}>
      <MenubarPrimitive.RadioItem
        ref={ref}
        style={Platform.OS === 'web' ? webStyle : nativeStyle}
        {...props}
      >
        <View style={styles.indicatorBox}>
          <MenubarPrimitive.ItemIndicator>
            <View
              style={{
                backgroundColor: colors.text,
                height: 8,
                width: 8,
                borderRadius: 50,
              }}
            />
          </MenubarPrimitive.ItemIndicator>
        </View>
        <>{children}</>
      </MenubarPrimitive.RadioItem>
    </TextClassContext.Provider>
  );
});
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ inset, style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <MenubarPrimitive.Label
      ref={ref}
      style={[styles.label, { color: colors.text }, inset && { paddingLeft: 32 }, style]}
      {...props}
    />
  );
});
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenStyle = StyleSheet.flatten([
    styles.separator,
    { backgroundColor: colors.border },
    style,
  ]);

  return <MenubarPrimitive.Separator ref={ref} style={flattenStyle} {...props} />;
});
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ style, ...props }: React.ComponentPropsWithoutRef<typeof Text>) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <Text
      style={{
        marginLeft: 'auto',
        fontSize: 12,
        letterSpacing: 1,
        color: colors.mutedText,
      }}
      {...props}
    />
  );
};
MenubarShortcut.displayName = 'MenubarShortcut';

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    padding: 4,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    paddingHorizontal: Platform.OS === 'web' ? 12 : 16,
    paddingVertical: 6,
  },
  subTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  subContent: {
    zIndex: 50,
    minWidth: 128,
    overflow: 'hidden',
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 4,
    padding: 4,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
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
    alignItems: 'center',
    gap: 8,
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
  indicatorBox: {
    position: 'absolute',
    left: 8,
    height: 14,
    width: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: 600,
  },
  separator: {
    marginHorizontal: -4,
    marginVertical: 4,
    height: 1,
  },
});
