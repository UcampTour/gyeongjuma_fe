import { useEffect, useState } from "react";

export const useAnimatedNumber = (targetNumber: number, duration: number = 500) => {
    const [currentNumber, setCurrentNumber] = useState(targetNumber);
  
    useEffect(() => {
      let startTimestamp: number | null = null;
      const startNumber = currentNumber;
  
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
  
        setCurrentNumber(
          Math.floor(progress * (targetNumber - startNumber) + startNumber),
        );
  
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
  
      window.requestAnimationFrame(step);
    }, [targetNumber]);
  
    return currentNumber;
  };