import React, { createContext, useState, useContext } from "react";

interface Thresholds {
  min: number;
  max: number;
}

const ThresholdContext = createContext<{
  thresholds: Thresholds;
  setThresholds: React.Dispatch<React.SetStateAction<Thresholds>>;
  time: Date;
  setTime: React.Dispatch<React.SetStateAction<Date>>;
}>({
  thresholds: { min: 10, max: 25 },
  setThresholds: () => {},
  time: new Date(),
  setTime: () => {},
});

export const ThresholdProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [thresholds, setThresholds] = useState<Thresholds>({
    min: 10,
    max: 25,
  });
  const [time, setTime] = useState<Date>(new Date());
  return (
    <ThresholdContext.Provider
      value={{ thresholds, setThresholds, time, setTime }}
    >
      {children}
    </ThresholdContext.Provider>
  );
};

export const useThresholds = () => useContext(ThresholdContext);

export {};
