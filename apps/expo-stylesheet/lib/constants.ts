export const NAV_THEME: Record<'light' | 'dark', ICustomThemeColor> = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    borderMedium: 'hsl(240 5.9% 65%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(240 5.9% 10%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground

    // Input / Muted
    muted: 'hsl(240 4.8% 95.9%)', // subtle background
    mutedText: 'hsl(240 3.8% 46.1%)', // placeholder/secondary
    accent: 'hsl(240 4.8% 92.9%)', // accent background color
    accentText: 'hsl(240 5.9% 10%)', // accent text color
    accentMild: 'hsl(240 4.8% 98%)', // accent mild background color
    ring: 'hsl(240 4.9% 83.9%)', // focus ring

    // Button-specific
    buttonPrimary: 'hsl(240 5.9% 10%)',
    buttonPrimaryText: 'hsl(0 0% 100%)',

    buttonSecondary: 'hsl(240 4.8% 95.9%)',
    buttonSecondaryText: 'hsl(240 10% 3.9%)',

    buttonGhost: 'transparent',
    buttonGhostText: 'hsl(240 10% 3.9%)',

    buttonOutline: 'transparent',
    buttonOutlineText: 'hsl(240 10% 3.9%)',

    buttonLink: 'transparent',
    buttonLinkText: 'hsl(240 5.9% 10%)',
  },
  dark: {
    background: 'hsl(240 10% 3.9%)', // background
    border: 'hsl(240 3.7% 18%)', // border
    borderMedium: 'hsl(240 3.7% 35%)', // border
    card: 'hsl(240 10% 3.9%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(0 0% 98%)', // primary
    text: 'hsl(0 0% 98%)', // foreground

    // Input / Muted
    muted: 'hsl(240 3.7% 15.9%)', // subtle background
    mutedText: 'hsl(240 5% 64.9%)', // placeholder/secondary
    accent: 'hsl(240 3.7% 17.9%)', // accent background color
    accentText: 'hsl(0 0% 98%)', // accent text color
    accentMild: 'hsl(240 3.7% 8%)', // accent mild background color
    ring: 'hsl(240 4% 16.9%)', // focus ring

    // Button-specific
    buttonPrimary: 'hsl(0 0% 98%)',
    buttonPrimaryText: 'hsl(240 10% 3.9%)',

    buttonSecondary: 'hsl(240 3.7% 13%)',
    buttonSecondaryText: 'hsl(0 0% 98%)',

    buttonGhost: 'transparent',
    buttonGhostText: 'hsl(0 0% 98%)',

    buttonOutline: 'transparent',
    buttonOutlineText: 'hsl(0 0% 98%)',

    buttonLink: 'transparent',
    buttonLinkText: 'hsl(0 0% 98%)',
  },
};

export interface ICustomThemeColor {
  background: string;
  border: string;
  borderMedium: string;
  card: string;
  notification: string;
  primary: string;
  text: string;

  // Input / Muted
  muted: string;
  mutedText: string;
  accent: string;
  accentText: string;
  accentMild: string;
  ring: string;

  // Button-specific
  buttonPrimary: string;
  buttonPrimaryText: string;
  buttonSecondary: string;
  buttonSecondaryText: string;
  buttonGhost: string;
  buttonGhostText: string;
  buttonOutline: string;
  buttonOutlineText: string;
  buttonLink: string;
  buttonLinkText: string;
}

export type ICustomTheme = ReactNavigation.Theme & { colors: ICustomThemeColor };
