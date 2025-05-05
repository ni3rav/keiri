"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "~/lib/utils";

interface CountdownTimerProps {
  seconds: number;
  className?: string;
  onComplete?: () => void;
  isPaused?: boolean;
  reset?: boolean;
}

export function CountdownTimer({
  seconds: initialSeconds,
  className,
  onComplete,
  isPaused = false,
  reset = false,
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setSeconds(initialSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  useEffect(() => {
    if (reset) {
      setSeconds(initialSeconds);
      setIsActive(true);
    }
  }, [reset, initialSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0 && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            if (interval) clearInterval(interval);
            setIsActive(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onComplete, isPaused]);

  // Format time
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: remainingSeconds.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds: secs } = formatTime(seconds);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <TimeUnit label="Hours" value={hours} />
        <div className="text-2xl sm:text-4xl font-bold text-primary">:</div>
        <TimeUnit label="Minutes" value={minutes} />
        <div className="text-2xl sm:text-4xl font-bold text-primary">:</div>
        <TimeUnit label="Seconds" value={secs} />
      </div>
    </div>
  );
}

interface TimeUnitProps {
  label: string;
  value: string;
}

function TimeUnit({ label, value }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-20 sm:w-24 sm:h-28 bg-muted rounded-lg overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              mass: 0.9,
              duration: 0.5,
            }}
            className="absolute inset-0 flex items-center justify-center text-3xl sm:text-5xl font-bold text-primary"
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-xs sm:text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
