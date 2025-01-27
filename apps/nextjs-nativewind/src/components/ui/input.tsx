'use client';

import * as React from 'react';
import * as InputPrimitive from '@rnr-method/input';

const Input = () => {
  const [value, setValue] = React.useState('');

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <InputPrimitive.Input
      placeholder='Write some stuff...'
      value={value}
      onChangeText={onChangeText}
      aria-labelledby='inputLabel'
      aria-errormessage='inputError'
    />
  );
};

Input.displayName = 'Input';

export { Input };
