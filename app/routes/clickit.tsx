import React from "react";

type Coordinates = { x: number; y: number };

export default function ClickIt() {
  const [coordinates, setCoordinates] = React.useState<Coordinates>({
    x: 0,
    y: 0,
  });

  function handleOnClick(e: React.MouseEvent) {
    setCoordinates({ x: e.pageX, y: e.pageY });
  }

  return (
    <main className="h-full" onClick={handleOnClick}>
      <Circle coordinates={coordinates}></Circle>
    </main>
  );
}

function Circle({ coordinates }: { coordinates: Coordinates }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="h-full w-full"
    >
      <circle
        cx={coordinates.x}
        cy={coordinates.y}
        r="15"
        fill="#FF00FF"
        stroke="#000000"
        stroke-width="2"
      />
    </svg>
  );
}
