
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.2357652fcd0341adbab6c7f81cc0feb3',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://2357652f-cd03-41ad-bab6-c7f81cc0feb3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;
