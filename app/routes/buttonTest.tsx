export default function TestPage() {
  function onPlay() {
    console.log("ciccio");
  }

  return (
    <main className="flex h-full items-center justify-center">
      <Button onClick={onPlay}>Click Me!</Button>
    </main>
  );
}

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border py-1 px-2 hover:bg-slate-50"
    >
      {children}
    </button>
  );
}
