import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.revibe', // ✅ Valid Java package format
  appName: 'Revibe',
  webDir: 'dist',
  // server: {
  //   url: 'https://974b7be1-981c-4f37-8edb-6a381907d0e6.lovableproject.com?forceHideBadge=true',
  //   cleartext: true
  // },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#eee6d7',
      showSpinner: false
    }
  }
};

export default config;
