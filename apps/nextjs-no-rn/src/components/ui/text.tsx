'use client';

import { Text as RNPText } from '@rn-primitives/core';
import { mergeProps } from '@rn-primitives/utils';
import * as React from 'react';
import { cn } from '~/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

const TEXT_WEB_PROPS = {
  as: 'p',
} as const;

function Text({ className, web, ...props }: React.ComponentProps<typeof RNPText>) {
  const textClass = React.useContext(TextClassContext);
  return (
    <RNPText
      web={mergeProps(TEXT_WEB_PROPS, web)}
      className={cn('text-base text-foreground', textClass, className)}
      {...props}
    />
  );
}

Text.displayName = 'Text';

export { Text, TextClassContext };
