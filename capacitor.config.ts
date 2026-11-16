import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pokedex.mobile',
  appName: 'Pokedex Mobile',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: '#0B1730',
      showSpinner: false
    }
  }
};

export default config;