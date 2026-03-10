import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  CormorantGaramond_300Light,
  CormorantGaramond_300Light_Italic,
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium_Italic,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Cinzel_400Regular,
  Cinzel_500Medium,
} from '@expo-google-fonts/cinzel';
import * as SplashScreen from 'expo-splash-screen';
import { GoldenDayProvider } from '@/contexts/GoldenDayContext';
// import { ensureRevenueCatConfigured } from '@/lib/revenuecat'; // RC disabled until App Store submission

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_300Light,
    CormorantGaramond_300Light_Italic,
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_500Medium_Italic,
    Cinzel_400Regular,
    Cinzel_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // useEffect(() => {
  //   if (Platform.OS === 'web') return;
  //   ensureRevenueCatConfigured().catch((e) => {
  //     console.error('RevenueCat config failed:', e);
  //   });
  // }, []); // RC disabled until App Store submission

  if (!fontsLoaded) return null;

  return (
    <GoldenDayProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GoldenDayProvider>
  );
}
