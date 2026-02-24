import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { GoldenDayProvider } from '@/contexts/GoldenDayContext';
import { ensureRevenueCatConfigured } from '@/lib/revenuecat';

export default function Layout() {
  useEffect(() => {
    if (Platform.OS === 'web') return;

    ensureRevenueCatConfigured().catch((e) => {
      console.error('RevenueCat config failed:', e);
    });
  }, []);

  return (
    <GoldenDayProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GoldenDayProvider>
  );
}
