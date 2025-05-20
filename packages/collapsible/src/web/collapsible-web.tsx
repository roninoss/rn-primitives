import type { RootProps, TriggerProps, ContentProps } from './types';

function Root(props: RootProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Root` from @rn-primitives/collapsible/web is only supported on web.');
  }
  return null;
}

function Trigger(props: TriggerProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/collapsible/web is only supported on web.');
  }
  return null;
}

function Content(props: ContentProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('`Trigger` from @rn-primitives/collapsible/web is only supported on web.');
  }
  return null;
}

export { Content, Root, Trigger };
