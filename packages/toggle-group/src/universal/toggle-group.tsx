import {
  Item as ItemNative,
  ItemProps as ItemPropsNative,
  Root as RootNative,
  useItemContext,
  useRootContext,
} from '../native';
import type { ItemProps, RootProps } from './types';

function Root({ web: _web, native, ...props }: RootProps) {
  return <RootNative {...props} {...native} />;
}

function Item({ web: _web, native, ref, disabled, ...props }: ItemProps) {
  return (
    <ItemNative ref={ref as ItemPropsNative['ref']} {...props} {...native} disabled={disabled} />
  );
}

export { Item, Root, useItemContext, useRootContext };
