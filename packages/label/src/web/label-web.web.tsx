import { Label } from '@radix-ui/react-label';
import { Pressable } from '@rn-primitives/core/dist/web';
import * as React from 'react';
import type { RootProps, TextProps } from './types';

const RootInternalForPropContext = React.createContext<string | undefined>(undefined);

const Root = ({ for: forProp, tabIndex = -1, ...props }: RootProps) => {
  return (
    <RootInternalForPropContext.Provider value={forProp}>
      <Pressable tabIndex={tabIndex} {...props} />
    </RootInternalForPropContext.Provider>
  );
};

const Text = (props: TextProps) => {
  const forProp = React.useContext(RootInternalForPropContext);

  return <Label htmlFor={forProp} {...props} />;
};

export { Root, Text };
