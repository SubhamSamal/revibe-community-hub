
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.974b7be1981c4f378edb6a381907d0e6',
  appName: 'revibe-community-hub',
  webDir: 'dist',
  server: {
    url: 'https://974b7be1-981c-4f37-8edb-6a381907d0e6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1d1d23',
      showSpinner: false
    }
  }
};

export default config;
