"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "~/lib/utils";
import { ChevronUp, ChevronDown, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

const MIN_TIME = 30 * 60; // 30 minutes in seconds
const MAX_TIME = 3 * 60 * 60; // 3 hours in seconds
const TIME_STEP = 10 * 60; // 10 minutes in seconds

interface CountdownTimerProps {
  seconds: number;
  className?: string;
  onComplete?: () => void;
  isPaused?: boolean;
  reset?: boolean;
  onTimeChange?: (seconds: number) => void;
}

export function CountdownTimer({
  seconds: initialSeconds,
  className,
  onComplete,
  isPaused = false,
  reset = false,
  onTimeChange,
}: CountdownTimerProps) {
  const validatedInitialSeconds = Math.max(
    MIN_TIME,
    Math.min(MAX_TIME, Math.round(initialSeconds))
  );

  const [seconds, setSeconds] = useState(validatedInitialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isPausedInternal, setIsPausedInternal] = useState(isPaused);

  const incrementTime = () => {
    setSeconds((prev) => {
      const newValue = Math.min(prev + TIME_STEP, MAX_TIME);
      onTimeChange?.(newValue);
      return newValue;
    });
  };

  const decrementTime = () => {
    setSeconds((prev) => {
      const newValue = Math.max(prev - TIME_STEP, MIN_TIME);
      onTimeChange?.(newValue);
      return newValue;
    });
  };

  const handlePause = () => {
    setIsPausedInternal((prev) => !prev);
  };

  const handleReset = () => {
    setSeconds(validatedInitialSeconds);
    setIsActive(false);
    setIsPausedInternal(false);
  };

  const startTimer = () => {
    setIsActive(true);
  };

  useEffect(() => {
    const validatedSeconds = Math.max(
      MIN_TIME,
      Math.min(MAX_TIME, Math.round(initialSeconds))
    );
    setSeconds(validatedSeconds);
    setIsActive(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (reset) {
      const validatedSeconds = Math.max(
        MIN_TIME,
        Math.min(MAX_TIME, Math.round(initialSeconds))
      );
      setSeconds(validatedSeconds);
      setIsActive(false);
    }
  }, [reset, initialSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0 && !isPausedInternal) {
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
  }, [isActive, seconds, onComplete, isPausedInternal]);

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
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        className
      )}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={incrementTime}
          disabled={seconds >= MAX_TIME || isActive}
          className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increase time"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <TimeUnit label="Hours" value={hours} />
        <div className="text-2xl sm:text-4xl font-bold text-primary">:</div>
        <TimeUnit label="Minutes" value={minutes} />
        <div className="text-2xl sm:text-4xl font-bold text-primary">:</div>
        <TimeUnit label="Seconds" value={secs} />
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={decrementTime}
          disabled={seconds <= MIN_TIME || isActive}
          className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease time"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
        {!isActive ? (
          <Button
            size="lg"
            variant="default"
            className="w-40 font-bold"
            onClick={startTimer}
          >
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
        ) : (
          <Button
            size="lg"
            variant="default"
            className="w-40 font-bold"
            onClick={handlePause}
          >
            {isPausedInternal ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            )}
          </Button>
        )}
        <Button
          size="lg"
          variant="destructive"
          className="w-40 font-bold"
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
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
