import {
  Content as ContentNative,
  Root as RootNative,
  Trigger as TriggerNative,
  type TriggerRef as TriggerRefNative,
} from '../native';
import type { ContentProps, RootProps, TriggerProps } from './types';

function Root({ web: _web, native, ...props }: RootProps) {
  return <RootNative {...props} {...native} />;
}

function Content({ web: _web, native, ...props }: ContentProps) {
  return <ContentNative {...props} {...native} />;
}

function Trigger({ ref, web: _web, native, ...props }: TriggerProps) {
  return <TriggerNative ref={ref as TriggerRefNative} {...props} {...native} />;
}

export { Content, Root, Trigger };
