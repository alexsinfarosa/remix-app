export default function TestPage() {
  function onPlay() {
    console.log("ciccio");
  }

  return (
    <main className="flex h-full flex-col items-center justify-center space-y-4">
      <Button onClick={onPlay}>Click Me!</Button>
      <Button href="./">Home</Button>
    </main>
  );
}

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

// Just a simple example of how to create a custom button that uses the correct
// html tag based on the type of property (href or others) we pass to it.
function Button(props: ButtonProps) {
  if (props.href) {
    return (
      <a className="text-blue-600 visited:text-purple-600" {...props}>
        {props.children}
      </a>
    );
  } else {
    return (
      <button
        type="button"
        className="rounded-md border py-1 px-2 hover:bg-slate-50"
        {...props}
      >
        {props.children}
      </button>
    );
  }
}
