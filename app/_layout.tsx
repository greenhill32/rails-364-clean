import { Stack } from 'expo-router';
import { GoldenDayProvider } from '@/contexts/GoldenDayContext';

export default function Layout() {
  return (
    <GoldenDayProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GoldenDayProvider>
  );
}
