import type { CapacitorConfig } from "@capacitor/cli";
import { CameraResultType } from "@capacitor/camera";

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'go-and-grow',
  webDir: 'dist',
  plugins: {
    Camera: {
      resultType: CameraResultType.DataUrl,
    },
    Geolocation: {
      enableHighAccuracy: true,
    },
  }
};

export default config;
