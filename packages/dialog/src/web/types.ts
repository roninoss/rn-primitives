import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
  Portal,
} from '@radix-ui/react-dialog';

type ContentPropsWebOnly = React.ComponentProps<'div'>;

type TriggerPropsWebOnly = React.ComponentProps<'button'>;

type ClosePropsWebOnly = React.ComponentProps<'button'>;

type DescriptionPropsWebOnly = React.ComponentProps<'p'>;

type OverlayPropsWebOnly = React.ComponentProps<'div'>;

type PortalPropsWebOnly = Pick<React.ComponentProps<typeof Portal>, 'container'>;

type TitlePropsWebOnly = React.ComponentProps<'h1'>;

type RootProps = DialogProps;

type CloseProps = DialogCloseProps;

type DescriptionProps = DialogDescriptionProps;

type OverlayProps = DialogOverlayProps;

type PortalProps = DialogPortalProps;

type TitleProps = DialogTitleProps;

type TriggerProps = DialogTriggerProps;

type ContentProps = DialogContentProps;

export type {
  CloseProps,
  ClosePropsWebOnly,
  ContentProps,
  ContentPropsWebOnly,
  DescriptionProps,
  DescriptionPropsWebOnly,
  OverlayProps,
  OverlayPropsWebOnly,
  PortalProps,
  PortalPropsWebOnly,
  RootProps,
  TitleProps,
  TitlePropsWebOnly,
  TriggerProps,
  TriggerPropsWebOnly,
};
