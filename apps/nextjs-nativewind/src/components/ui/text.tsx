'use client';

import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '~/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({ ref, className, asChild = false, ...props }: SlottableTextProps & { ref?: React.Ref<TextRef> }) {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-base text-foreground web:select-text', textClass, className)}
        ref={ref}
        {...props}
      />
    }

Text.displayName = 'Text';

export { Text, TextClassContext };
