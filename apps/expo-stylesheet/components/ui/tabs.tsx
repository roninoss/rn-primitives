import * as React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import * as TabsPrimitive from '@rn-primitives/tabs';
import { useTheme } from '@react-navigation/native';
import { type ICustomTheme } from '~/lib/constants';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const flattenStyle = StyleSheet.flatten([styles.list, { backgroundColor: colors.muted }, style]);

  return <TabsPrimitive.List ref={ref} style={flattenStyle} {...props} />;
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { style?: StyleProp<ViewStyle> }
>(({ style, ...props }, ref) => {
  const { colors } = useTheme() as ICustomTheme;
  const { value } = TabsPrimitive.useRootContext();
  const isActive = value === props.value;

  return (
    <TextClassContext.Provider
      value={[styles.triggerText, { color: isActive ? colors.text : colors.mutedText }]}
    >
      <TabsPrimitive.Trigger
        ref={ref}
        style={StyleSheet.flatten([
          styles.trigger,
          {
            backgroundColor: isActive ? colors.background : 'transparent',
            shadowColor: isActive ? colors.text : 'transparent',
            opacity: props.disabled ? 0.5 : 1,
          },
          style,
        ])}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ style, ...props }, ref) => <TabsPrimitive.Content ref={ref} style={style} {...props} />);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };

const styles = StyleSheet.create({
  list: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 4,
  },
  trigger: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  triggerText: {
    fontSize: 14,
    fontWeight: 500,
  },
});
