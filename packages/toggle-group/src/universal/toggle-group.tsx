import * as React from 'react';
import { Item as ItemNative, Root as RootNative, useItemContext, useRootContext } from '../native';
import type { ItemProps, RootProps } from './types';

function Root({ web: _web, native, ...props }: RootProps) {
  return <RootNative {...props} {...native} />;
}

function Item({ web: _web, native, ...props }: ItemProps) {
  return <ItemNative {...props} {...native} />;
}

export { Item, Root, useItemContext, useRootContext };
