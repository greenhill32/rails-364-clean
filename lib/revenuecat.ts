import { Platform } from 'react-native';
import Constants from 'expo-constants';
import Purchases from 'react-native-purchases';

const REVENUECAT_APPLE_API_KEY = 'appl_ieMTFqKmtaifbVskZxnUNhjZXJP';
const REVENUECAT_ENABLED = false; // Re-enable for a later RC/paywall build.

let configurePromise: Promise<void> | null = null;

export function ensureRevenueCatConfigured(): Promise<void> {
  if (Platform.OS === 'web' || !REVENUECAT_ENABLED) {
    return Promise.resolve();
  }

  // Expo Go cannot use the native store with a normal Apple API key.
  if (Constants.appOwnership === 'expo') {
    return Promise.resolve();
  }

  if (!configurePromise) {
    configurePromise = (async () => {
      Purchases.configure({ apiKey: REVENUECAT_APPLE_API_KEY });
    })();
  }

  return configurePromise;
}
