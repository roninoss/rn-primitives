import { Text, TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import { View } from '@rn-primitives/core';
import { mergeProps } from '@rn-primitives/utils';

function Card({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn(
        'rounded-lg border border-border bg-card shadow-sm shadow-foreground/10',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
}

const WEB_CARD_TITLE_PROPS = {
  as: 'h3',
} as const;

function CardTitle({ className, web, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      role='heading'
      web={mergeProps(WEB_CARD_TITLE_PROPS, web)}
      className={cn(
        'text-2xl text-card-foreground font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <TextClassContext.Provider value='text-card-foreground'>
      <View className={cn('p-6 pt-0', className)} {...props} />
    </TextClassContext.Provider>
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-row items-center p-6 pt-0', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
