import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapters: [
    vercel({
      webAnalytics: { enabled: true },
    }),
  ],
  integrations: [
    starlight({
      favicon: '/favicon.png',
      title: 'rn-primitives',
      description: 'Documentation for rn-primitives',
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
        Head: './src/components/Head.astro',
      },
      social: {
        github: 'https://github.com/roninoss/rn-primitives',
      },
      sidebar: [
        {
          label: 'Introduction',
          link: '/',
        },
        {
          label: 'Core',
          items: [
            {
              label: 'Accordion',
              link: '/accordion/',
            },
            {
              label: 'Alert Dialog',
              link: '/alert-dialog/',
            },
            {
              label: 'Aspect Ratio',
              link: '/aspect-ratio/',
            },
            {
              label: 'Avatar',
              link: '/avatar/',
            },
            {
              label: 'Checkbox',
              link: '/checkbox/',
            },
            {
              label: 'Collapsible',
              link: '/collapsible/',
            },
            {
              label: 'Context Menu',
              link: '/context-menu/',
            },
            {
              label: 'Dialog',
              link: '/dialog/',
            },
            {
              label: 'Dropdown Menu',
              link: '/dropdown-menu/',
            },
            {
              label: 'Hover Card',
              link: '/hover-card/',
            },
            {
              label: 'Label',
              link: '/label/',
            },
            {
              label: 'Menubar',
              link: '/menubar/',
            },
            {
              label: 'Navigation Menu',
              link: '/navigation-menu/',
            },
            {
              label: 'Popover',
              link: '/popover/',
            },
            {
              label: 'Progress',
              link: '/progress/',
            },
            {
              label: 'Radio Group',
              link: '/radio-group/',
            },
            {
              label: 'Select',
              link: '/select/',
            },
            {
              label: 'Separator',
              link: '/separator/',
            },
            {
              label: 'Slider',
              link: '/slider/',
            },
            {
              label: 'Switch',
              link: '/switch/',
            },
            {
              label: 'Table',
              link: '/table/',
            },
            {
              label: 'Tabs',
              link: '/tabs/',
            },
            {
              label: 'Toast',
              link: '/toast/',
            },
            {
              label: 'Toggle',
              link: '/toggle/',
            },
            {
              label: 'Toggle Group',
              link: '/toggle-group/',
            },
            {
              label: 'Toolbar',
              link: '/toolbar/',
            },
            {
              label: 'Tooltip',
              link: '/tooltip/',
            },
          ],
        },
        {
          label: 'Shared',
          items: [
            {
              label: 'Hooks',
              link: '/hooks/',
            },
            {
              label: 'Portal',
              link: '/portal/',
            },
            {
              label: 'Slot',
              link: '/slot/',
            },
            {
              label: 'Types',
              link: '/types/',
            },
            {
              label: 'Utils',
              link: '/utils/',
            },
          ],
        },
      ],
      customCss: ['./src/tailwind.css'],
    }),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    react(),
  ],
});
