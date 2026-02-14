import { useState, useRef, useEffect } from "react";
export const useTimeFillo = (initTime: number) => {
  const [time, setTime] = useState<number>(initTime);
  const timer = useRef<any>(null);

  useEffect(() => {
    if (time > 0) {
      timer.current = setInterval(() => {
        setTime((prevTime: number) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [time]);

  return {
    time,
  };
};
