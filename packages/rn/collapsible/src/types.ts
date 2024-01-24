import type { ForceMountable } from '@rn-primitives/internal-types';

interface CollapsibleRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
}

type CollapsibleContentProps = ForceMountable;

export type { CollapsibleContentProps, CollapsibleRootProps };
