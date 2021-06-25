import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sample.my',
  appName: 'sample',
  webDir: 'dist/sample',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  }
};

export default config;
