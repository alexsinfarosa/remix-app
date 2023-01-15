import React from "react";

type initialState = {
  startDate?: string;
  endDate?: string;
};

export default function ReducerExample() {
  const [event, updateEvent] = React.useReducer(
    (prev: initialState, next: initialState) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    { startDate: "", endDate: "" }
  );

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className=" mb-8 flex space-x-8">
        <p>
          <label htmlFor="startDate" className=" font-medium">
            Start Date:{" "}
          </label>
          <input
            type="date"
            id="startDate"
            name="start-date"
            onChange={(e) => updateEvent({ startDate: e.target.value })}
          ></input>
        </p>

        <p>
          <label htmlFor="endDate" className=" font-medium">
            End Date:{" "}
          </label>
          <input
            type="date"
            id="endDate"
            name="end-date"
            onChange={(e) => updateEvent({ endDate: e.target.value })}
            max={new Date().toISOString().split("T")[0]}
          ></input>
        </p>
      </section>

      <section>
        <pre className="text-slate-600">{JSON.stringify(event, null, 4)}</pre>
      </section>
    </main>
  );
}
