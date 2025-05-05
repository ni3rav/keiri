import { CountdownTimer } from "~/components/countdown-timer";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <CountdownTimer seconds={7200} />
    </div>
  );
}
