import * as React from 'react';
import { Text as RNPText } from '@rn-primitives/core';
import { cn } from '~/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({ className, ...props }: React.ComponentProps<typeof RNPText>) {
  const textClass = React.useContext(TextClassContext);
  return (
    <RNPText
      className={cn('text-base text-foreground web:select-text', textClass, className)}
      {...props}
    />
  );
}

export { Text, TextClassContext };
