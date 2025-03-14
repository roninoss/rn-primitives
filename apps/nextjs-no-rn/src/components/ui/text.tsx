'use client';

import { Text as RNPText } from '@rn-primitives/core';
import * as React from 'react';
import { cn } from '~/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNPText>) {
  const textClass = React.useContext(TextClassContext);
  return (
    <RNPText
      className={cn('text-base text-foreground web:select-text', textClass, className)}
      {...props}
    />
  );
}

Text.displayName = 'Text';

export { Text, TextClassContext };
