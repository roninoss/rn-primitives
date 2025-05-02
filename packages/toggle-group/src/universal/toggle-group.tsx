import {
  Item as ItemNative,
  Root as RootNative,
  ItemProps as ItemPropsNative,
  useItemContext,
  useRootContext,
} from '../native';
import type { ItemProps, RootProps } from './types';

function Root({ web: _web, native, ...props }: RootProps) {
  return <RootNative {...props} {...native} />;
}

function Item({ web: _web, native, ref, ...props }: ItemProps) {
  return <ItemNative ref={ref as ItemPropsNative['ref']} {...props} {...native} />;
}

export { Item, Root, useItemContext, useRootContext };
