import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Text } from '~/components/ui/text';

export default function AccordionScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container]}>
      <Accordion type='multiple' collapsible defaultValue={['item-1']} style={styles.accordion}>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <Text style={{ color: colors.text }}>Is it accessible?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text style={{ color: colors.text }}>
              Yes. It adheres to the WAI-ARIA design pattern.
            </Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-2'>
          <AccordionTrigger>
            <Text style={{ color: colors.text }}>What are universal components?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text style={{ color: colors.text }}>
              In the world of React Native, universal components are components that work on both
              web and native platforms.
            </Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-3'>
          <AccordionTrigger>
            <Text style={{ color: colors.text }}>Is this component universal?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text style={{ color: colors.text }}>
              Yes. Try it out on the web, iOS, and/or Android.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24, // p-6
  },
  accordion: {
    width: '100%',
    maxWidth: 384, // max-w-sm
  },
});
