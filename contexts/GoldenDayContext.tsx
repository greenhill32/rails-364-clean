import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import { ensureRevenueCatConfigured } from '@/lib/revenuecat';

type GoldenDay = { month: number; date: number } | null;

type GoldenDayContextType = {
  goldenDay: GoldenDay;
  setGoldenDay: (month: number, date: number) => void;
  quotesUsed: number;
  visitedDayKeys: string[];
  markDayVisited: (dayKey: string) => void;
  isPurchased: boolean;
  setPurchased: (value: boolean) => void;
  incrementQuotesUsed: () => void;
};

const GoldenDayContext = createContext<GoldenDayContextType>({
  goldenDay: null,
  setGoldenDay: () => {},
  quotesUsed: 0,
  visitedDayKeys: [],
  markDayVisited: () => {},
  isPurchased: false,
  setPurchased: () => {},
  incrementQuotesUsed: () => {},
});

export function GoldenDayProvider({ children }: { children: ReactNode }) {
  const [goldenDay, setGoldenDayState] = useState<GoldenDay>(null);
  const [quotesUsed, setQuotesUsed] = useState(0);
  const [visitedDayKeys, setVisitedDayKeys] = useState<string[]>([]);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    async function loadPersisted() {
      const [storedQuotes, storedPurchased, storedGoldenDay, storedVisitedDays] = await Promise.all([
        AsyncStorage.getItem('quotes_used'),
        AsyncStorage.getItem('is_purchased'),
        AsyncStorage.getItem('golden_day'),
        AsyncStorage.getItem('visited_day_keys'),
      ]);
      if (storedQuotes !== null) setQuotesUsed(parseInt(storedQuotes, 10));
      if (storedPurchased === 'true') setIsPurchased(true);
      if (storedGoldenDay !== null) {
        try {
          setGoldenDayState(JSON.parse(storedGoldenDay));
        } catch {}
      }
      if (storedVisitedDays !== null) {
        try {
          const parsed = JSON.parse(storedVisitedDays);
          if (Array.isArray(parsed)) {
            setVisitedDayKeys(parsed.filter((v) => typeof v === 'string'));
          }
        } catch {}
      }

      // Check RevenueCat for ground truth (after showing cached state fast)
      if (Platform.OS !== 'web') {
        try {
          await ensureRevenueCatConfigured();
          const customerInfo = await Purchases.getCustomerInfo();
          if (customerInfo.entitlements.active['pro']) {
            setIsPurchased(true);
            await AsyncStorage.setItem('is_purchased', 'true');
          }
        } catch {
          // Offline or not configured yet — fall back to cached value silently
        }
      }
    }
    loadPersisted();
  }, []);

  const setGoldenDay = async (month: number, date: number) => {
    setGoldenDayState({ month, date });
    await AsyncStorage.setItem('golden_day', JSON.stringify({ month, date }));
  };

  const setPurchased = async (value: boolean) => {
    setIsPurchased(value);
    await AsyncStorage.setItem('is_purchased', String(value));
  };

  const markDayVisited = async (dayKey: string) => {
    setVisitedDayKeys((prev) => {
      if (prev.includes(dayKey)) return prev;
      const next = [...prev, dayKey];
      AsyncStorage.setItem('visited_day_keys', JSON.stringify(next));
      return next;
    });
  };

  const incrementQuotesUsed = async () => {
    const next = quotesUsed + 1;
    setQuotesUsed(next);
    await AsyncStorage.setItem('quotes_used', String(next));
  };

  return (
    <GoldenDayContext.Provider value={{ goldenDay, setGoldenDay, quotesUsed, visitedDayKeys, markDayVisited, isPurchased, setPurchased, incrementQuotesUsed }}>
      {children}
    </GoldenDayContext.Provider>
  );
}

export function useGoldenDay() {
  return useContext(GoldenDayContext);
}
