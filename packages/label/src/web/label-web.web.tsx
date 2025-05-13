import { Label } from '@radix-ui/react-label';
import { Pressable } from '@rn-primitives/core/dist/web';
import * as React from 'react';
import type { RootProps, TextProps } from './types';

const RootInternalContext = React.createContext<{ forProp?: string } | null>(null);

const Root = ({ children, for: forProp, tabIndex = -1, ...props }: RootProps) => {
  return (
    <RootInternalContext.Provider value={{ forProp }}>
      <Pressable data-rn-primitives='pressable' tabIndex={tabIndex} {...props}>
        {children}
      </Pressable>
    </RootInternalContext.Provider>
  );
};

const Text = ({ children, ...props }: TextProps) => {
  const context = React.useContext(RootInternalContext);
  const forProp = context?.forProp;

  return (
    <Label htmlFor={forProp} {...props}>
      {children}
    </Label>
  );
};

export { Root, Text };
