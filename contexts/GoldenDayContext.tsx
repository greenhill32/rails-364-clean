import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GoldenDay = { month: number; date: number } | null;

type GoldenDayContextType = {
  goldenDay: GoldenDay;
  setGoldenDay: (month: number, date: number) => void;
  quotesUsed: number;
  isPurchased: boolean;
  incrementQuotesUsed: () => void;
};

const GoldenDayContext = createContext<GoldenDayContextType>({
  goldenDay: null,
  setGoldenDay: () => {},
  quotesUsed: 0,
  isPurchased: false,
  incrementQuotesUsed: () => {},
});

export function GoldenDayProvider({ children }: { children: ReactNode }) {
  const [goldenDay, setGoldenDayState] = useState<GoldenDay>(null);
  const [quotesUsed, setQuotesUsed] = useState(0);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    async function loadPersisted() {
      const [storedQuotes, storedPurchased] = await Promise.all([
        AsyncStorage.getItem('quotes_used'),
        AsyncStorage.getItem('is_purchased'),
      ]);
      if (storedQuotes !== null) setQuotesUsed(parseInt(storedQuotes, 10));
      if (storedPurchased === 'true') setIsPurchased(true);
    }
    loadPersisted();
  }, []);

  const setGoldenDay = (month: number, date: number) => {
    setGoldenDayState({ month, date });
  };

  const incrementQuotesUsed = async () => {
    const next = quotesUsed + 1;
    setQuotesUsed(next);
    await AsyncStorage.setItem('quotes_used', String(next));
  };

  return (
    <GoldenDayContext.Provider value={{ goldenDay, setGoldenDay, quotesUsed, isPurchased, incrementQuotesUsed }}>
      {children}
    </GoldenDayContext.Provider>
  );
}

export function useGoldenDay() {
  return useContext(GoldenDayContext);
}
