"use client";
import { CountdownTimer } from "~/components/countdown-timer";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isPaused, setIsPaused] = useState(false);
  const [isReset, setReset] = useState(false);

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 1000);
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8">
      <CountdownTimer seconds={7200} isPaused={isPaused} reset={isReset} />
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          size="lg"
          variant="default"
          className="px-24 md:px-16 font-bold cursor-pointer"
          onClick={handlePause}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button
          size="lg"
          variant="destructive"
          className="px-24 md:px-16 font-bold cursor-pointer"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
