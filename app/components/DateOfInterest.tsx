import { Form, useSubmit } from "@remix-run/react";
import * as React from "react";

export default function DateOfInterest() {
  const submit = useSubmit();
  const [value, setValue] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );

  function handleOnChange(event: React.ChangeEvent<HTMLFormElement>) {
    console.log(event.currentTarget);
    setValue(event.target.value);
    submit(event.currentTarget, { replace: true });
  }

  return (
    // <Form method="get" onChange={handleOnChange}>
    <>
      <label
        htmlFor="dateOfInterest"
        className="block text-sm font-medium text-gray-700"
      >
        Date of Interest:
      </label>
      <input
        type="date"
        id="dateOfInterest"
        name="doi"
        defaultValue={value}
        min="2019-01-01"
        max={new Date().toISOString().split("T")[0]}
        className="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 pl-5 text-sm leading-5 text-sky-900 focus:border-sky-500 focus:ring-sky-500"
      />
    </>
    // </Form>
  );
}
