import type { ForceMountable } from '@rn-primitives/types';

interface CheckboxRootProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

type CheckboxIndicator = ForceMountable;

export type { CheckboxRootProps, CheckboxIndicator };
