import React from "react";

type Coordinates = { x: number; y: number };

export default function ClickIt() {
  const [coordinates, setCoordinates] = React.useState<Coordinates[]>([]);
  const [pointer, setPointer] = React.useState(0);
  const points = coordinates.slice(0, pointer);

  console.log({ coordinates, points, pointer });

  function handleOnClick(e: React.MouseEvent) {
    const point = { x: e.clientX, y: e.clientY };
    const alreadyExists = coordinates.find(
      (co) => co.x === point.x && co.y === point.y
    );
    if (!alreadyExists && pointer >= coordinates.length) {
      setCoordinates([...coordinates, point]);
      setPointer(pointer + 1);
    }
  }

  function prevPoint() {
    if (pointer > 0) {
      setPointer(pointer - 1);
    }
  }

  function nextPoint() {
    if (pointer < coordinates.length) {
      setPointer(pointer + 1);
    }
  }

  return (
    <main className="h-full">
      <div
        className="inline-flex space-x-2"
        style={{ marginTop: "12px", marginLeft: "12px", height: "48px" }}
      >
        <button
          className="select-none rounded-md border px-4 py-1 text-emerald-900 hover:bg-emerald-300 disabled:opacity-40"
          onClick={prevPoint}
          disabled={pointer === 0}
        >
          Undo
        </button>
        <button
          className="select-none rounded-md border px-4 py-1 text-emerald-900 hover:bg-emerald-300 disabled:opacity-40"
          onClick={nextPoint}
          disabled={pointer === coordinates.length}
        >
          Forward
        </button>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        onClick={handleOnClick}
      >
        {points.map((coordinates, index) => (
          <Circle key={index} coordinates={coordinates}></Circle>
        ))}
      </svg>
    </main>
  );
}

function Circle({ coordinates }: { coordinates: Coordinates }) {
  return (
    <circle
      cx={coordinates.x}
      cy={coordinates.y - 60}
      r="8"
      fill="#10b981"
      stroke="#064e3b"
      strokeWidth="1"
    />
  );
}
