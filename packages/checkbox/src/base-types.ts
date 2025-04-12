import type { CheckboxIndicatorProps } from '@radix-ui/react-checkbox';

type BaseCheckboxRootProps = {
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

type BaseCheckboxIndicatorProps = Pick<CheckboxIndicatorProps, 'forceMount'>;

export type { BaseCheckboxIndicatorProps, BaseCheckboxRootProps };
