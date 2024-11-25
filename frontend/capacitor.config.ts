import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'frontend',
  webDir: 'dist/frontend/browser/',
  server: {
    androidScheme: 'https',
    allowNavigation: ['localhost', '10.4.201.222'],
  },
  android: {
    allowMixedContent: true, //mezclar http y https
  },
};

export default config;
