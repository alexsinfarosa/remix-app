import { useEffect, useState } from "react";

export default function TestPage() {
  return (
    <main className="flex h-full items-center justify-center">
      <Timer secondsLeft={15}></Timer>
    </main>
  );
}

// We pass in the number of seconds as a prop to the Timer component. Doing so makes the Timer
// component reusable.
function Timer({ secondsLeft }: { secondsLeft: number }) {
  const [startTime, setStartTime] = useState(0);
  const countdown = secondsLeft - startTime;

  useEffect(() => {
    const refId = setInterval(() => {
      setStartTime(startTime + 1);
    }, 1000);

    return () => clearInterval(refId); // this is important!
  });

  return (
    <section className="text-5xl">
      {countdown > 0 ? (
        <div>The 💣 will go off in: {countdown} secs</div>
      ) : (
        <div>BOOM!!!</div>
      )}
    </section>
  );
}
