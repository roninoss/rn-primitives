import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { toggleTextVariants, ToggleProps, toggleVariants } from '~/components/ui/toggle';
import { TextClassContext } from '~/components/ui/text';
import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group';
import { type ICustomTheme } from '~/lib/constants';

const ToggleGroupContext = React.createContext<ToggleProps | null>(null);

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleProps
>(({ style, variant, size, children, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Root ref={ref} style={[styles.group, style]} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (context === null) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    ToggleProps & {
      style?: StyleProp<ViewStyle>;
    }
>(({ children, variant, size, style, ...props }, ref) => {
  const context = useToggleGroupContext();
  const { value } = ToggleGroupPrimitive.useRootContext();
  const { colors } = useTheme() as ICustomTheme;

  const isSelected = ToggleGroupPrimitive.utils.getIsSelected(value, props.value);

  return (
    <TextClassContext.Provider
      value={[
        toggleTextVariants({ variant, size, colors }),
        { color: isSelected ? colors.accentText : colors.text },
      ]}
    >
      <ToggleGroupPrimitive.Item
        ref={ref}
        style={[
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
            colors,
          }),
          {
            backgroundColor: isSelected ? colors.accent : colors.card,
            borderColor: colors.borderMedium,
            borderWidth: StyleSheet.hairlineWidth,
          },
          props.disabled && { opacity: 0.5 },
          style,
        ]}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    </TextClassContext.Provider>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

function ToggleGroupIcon({
  icon: Icon,
  style,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & { icon: LucideIcon }) {
  const textClass = React.useContext(TextClassContext);
  const flattenTextStyles = StyleSheet.flatten(textClass);

  return <Icon style={[style]} color={flattenTextStyles?.color} {...props} />;
}

export { ToggleGroup, ToggleGroupIcon, ToggleGroupItem };

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
