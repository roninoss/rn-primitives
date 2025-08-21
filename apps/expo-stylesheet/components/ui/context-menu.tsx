import * as ContextMenuPrimitive from '@rn-primitives/context-menu';
import * as React from 'react';
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Check, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react-native';
import { TextClassContext } from '~/components/ui/text';
import { ICustomTheme } from '~/lib/constants';

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ inset, children, style, ...props }, ref) => {
  const { colors } = useTheme();
  const { open } = ContextMenuPrimitive.useSubContext();
  const Icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;

  return (
    <TextClassContext.Provider
      value={{
        userSelect: 'none',
        fontSize: 16,
        color: open ? colors.primary : colors.text,
      }}
    >
      <ContextMenuPrimitive.SubTrigger
        ref={ref}
        style={[
          styles.itemBase,
          open && { backgroundColor: colors.card },
          inset && { paddingLeft: 32 },
          style as StyleProp<ViewStyle>,
        ]}
        {...props}
      >
        <>{children}</>
        <Icon size={18} color={colors.text} style={{ marginLeft: 'auto' }} />
      </ContextMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
});
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      style={[
        styles.content,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style as StyleProp<ViewStyle>,
      ]}
      {...props}
    />
  );
});
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> & {
    overlayStyle?: StyleProp<ViewStyle>;
    portalHost?: string;
  }
>(({ overlayStyle, portalHost, style, ...props }, ref) => {
  const { colors } = useTheme();
  const flattenContentStyle = StyleSheet.flatten([
    styles.content,
    {
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    style,
  ]);

  return (
    <ContextMenuPrimitive.Portal hostName={portalHost}>
      <ContextMenuPrimitive.Overlay
        style={[Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined, overlayStyle]}
      >
        <ContextMenuPrimitive.Content ref={ref} style={flattenContentStyle} {...props} />
      </ContextMenuPrimitive.Overlay>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ inset, disabled, style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <TextClassContext.Provider
      value={{
        fontSize: 16,
        color: disabled ? colors.mutedText : colors.text,
      }}
    >
      <ContextMenuPrimitive.Item
        ref={ref}
        disabled={disabled}
        style={[
          styles.itemBase,
          inset && { paddingLeft: 32 },
          disabled && { opacity: 0.5 },
          style as StyleProp<ViewStyle>,
        ]}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ disabled, children, style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <TextClassContext.Provider value={{ fontSize: 14 }}>
      <ContextMenuPrimitive.CheckboxItem
        ref={ref}
        disabled={disabled}
        style={({ pressed }) => [
          styles.checkboxItem,
          disabled && { opacity: 0.5 },
          style as StyleProp<ViewStyle>,
          {
            backgroundColor: pressed ? colors.muted : 'transparent',
          },
        ]}
        {...props}
      >
        <View style={styles.indicatorBox}>
          <ContextMenuPrimitive.ItemIndicator>
            <Check size={14} strokeWidth={3} color={colors.text} />
          </ContextMenuPrimitive.ItemIndicator>
        </View>
        <>{children}</>
      </ContextMenuPrimitive.CheckboxItem>
    </TextClassContext.Provider>
  );
});
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ disabled, children, style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <TextClassContext.Provider value={{ fontSize: 14 }}>
      <ContextMenuPrimitive.RadioItem
        ref={ref}
        disabled={disabled}
        style={({ pressed }) => [
          styles.radioItem,
          disabled && { opacity: 0.5 },
          style as StyleProp<ViewStyle>,
          {
            backgroundColor: pressed ? colors.muted : 'transparent',
          },
        ]}
        {...props}
      >
        <View style={styles.indicatorBox}>
          <ContextMenuPrimitive.ItemIndicator>
            <View
              style={{
                backgroundColor: colors.text,
                height: 8,
                width: 8,
                borderRadius: 9999,
              }}
            />
          </ContextMenuPrimitive.ItemIndicator>
        </View>
        <>{children}</>
      </ContextMenuPrimitive.RadioItem>
    </TextClassContext.Provider>
  );
});
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ inset, style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      style={[styles.label, { color: colors.text }, inset && { paddingLeft: 32 }, style]}
      {...props}
    />
  );
});
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      style={[styles.separator, { backgroundColor: colors.border }, style]}
      {...props}
    />
  );
});
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ style, ...props }: React.ComponentPropsWithoutRef<typeof Text>) => {
  const { colors } = useTheme() as ICustomTheme;

  return (
    <Text
      style={[
        {
          marginLeft: 'auto',
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 1,
          color: colors.mutedText,
        },
        style,
      ]}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
};

const styles = StyleSheet.create({
  content: {
    zIndex: 50,
    minWidth: 128,
    overflow: 'hidden',
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 4,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  itemBase: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 2,
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
    height: StyleSheet.hairlineWidth,
  },
});
