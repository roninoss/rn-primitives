import type { ContentProps, RootProps, TriggerProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/collapsible/native is only supported on native.');
  }
  return null;
}

function Trigger(props: TriggerProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/collapsible/native is only supported on native.');
  }
  return null;
}

function Content(props: ContentProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Content` from @rn-primitives/collapsible/native is only supported on native.');
  }
  return null;
}

export { Content, Root, Trigger };
