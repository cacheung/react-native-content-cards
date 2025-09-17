import { LogLevel, MobileCore } from "@adobe/react-native-aepcore";
import { Messaging } from "@adobe/react-native-aepmessaging";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 3000);

  const [isInitialized, setIsInitialized] = useState(false);

  const initializeSDK = useCallback(async () => {
    try {
      // Initialize SDK exactly like the working sample app
      MobileCore.setLogLevel(LogLevel.DEBUG);
      
      await MobileCore.initializeWithAppId(
        "3149c49c3910/473386a6e5b0/launch-6099493a8c97-development"
      );
      console.log("AEP SDK Initialized");
      
      // Update propositions AFTER SDK is fully initialized
      // Use platform-specific surface names
      const surface = Platform.OS === 'android' ? 'rn/android/remote_image' : 'rn/ios/remote_image';
      console.log("Update propositions for surface:", surface);
      await Messaging.updatePropositionsForSurfaces([surface]);
      
      console.log("Propositions updated successfully in layout");
      setIsInitialized(true);
    } catch (error) {
      console.error("AEP SDK Initialization error:", error);
      setIsInitialized(true); // Don't hang the app
    }
  }, []);

  useEffect(() => {
    initializeSDK();
  }, [initializeSDK]);

  if (!isInitialized) {
    return (
      <View style={{}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Stack />;
}