import { createContext, useContext, useState, ReactNode } from 'react';

type GoldenDay = { month: number; date: number } | null;

type GoldenDayContextType = {
  goldenDay: GoldenDay;
  setGoldenDay: (month: number, date: number) => void;
};

const GoldenDayContext = createContext<GoldenDayContextType>({
  goldenDay: null,
  setGoldenDay: () => {},
});

export function GoldenDayProvider({ children }: { children: ReactNode }) {
  const [goldenDay, setGoldenDayState] = useState<GoldenDay>(null);

  const setGoldenDay = (month: number, date: number) => {
    setGoldenDayState({ month, date });
  };

  return (
    <GoldenDayContext.Provider value={{ goldenDay, setGoldenDay }}>
      {children}
    </GoldenDayContext.Provider>
  );
}

export function useGoldenDay() {
  return useContext(GoldenDayContext);
}
