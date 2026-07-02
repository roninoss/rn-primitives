import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://rnprimitives.com',
  output: 'static',
  adapters: [],
  integrations: [
    starlight({
      favicon: '/favicon.png',
      title: 'rn-primitives',
      description:
        'Unstyled, accessible React Native components with a unified API for iOS, Android, and Web.',
      logo: {
        dark: './src/assets/logo-dark.svg',
        light: './src/assets/logo-light.svg',
        alt: 'rn-primitives',
      },
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
        Head: './src/components/Head.astro',
      },
      expressiveCode: {
        themes: ['github-dark-default', 'github-light-default'],
        styleOverrides: {
          borderRadius: '0.75rem',
          borderColor: 'var(--sl-color-hairline-light)',
          codeFontFamily: "'JetBrains Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace",
          codeFontSize: '0.8125rem',
          codeLineHeight: '1.7',
          uiFontFamily: "'Inter Variable', ui-sans-serif, system-ui, sans-serif",
          frames: {
            frameBoxShadowCssValue: 'none',
            editorActiveTabIndicatorTopColor: 'var(--sl-color-accent)',
            editorActiveTabIndicatorHeight: '2px',
          },
        },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/roninoss/rn-primitives' },
      ],
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
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/jetbrains-mono',
        './src/tailwind.css',
        './src/styles/theme.css',
      ],
    }),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    react(),
  ],
});
