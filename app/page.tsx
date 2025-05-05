import { CountdownTimer } from "~/components/countdown-timer";

export default function Home() {
  return (
      <div className="h-screen w-screen grid place-items-center">
        <CountdownTimer seconds={7200}/>
      </div>
  );
}
