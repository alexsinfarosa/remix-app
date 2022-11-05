import * as React from "react";
import { isDateAfterDate2, isValidDate } from "~/utils";

export default function DateOfInterest({ doi }: { doi: string | null }) {
  const [value, setValue] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const minDate = "2019-01-01";
  let urlDate: string | null = null;
  if (doi) {
    const date = isValidDate(doi);
    if (date) {
      const isAfter = isDateAfterDate2(date, minDate);
      if (isAfter) {
        urlDate = date;
      }
    }
  }

  return (
    <>
      <label
        htmlFor="dateOfInterest"
        className="block text-sm font-medium text-gray-700"
      >
        Date of Interest:
      </label>
      <input
        data-testid="ciccio"
        type="date"
        id="dateOfInterest"
        name="doi"
        defaultValue={urlDate ?? value}
        onChange={(e) => setValue(e.target.value)}
        min="2019-01-01"
        max={new Date().toISOString().split("T")[0]}
        className="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 pl-5 text-sm leading-5 text-sky-900 focus:border-sky-500 focus:ring-sky-500"
      />
    </>
  );
}
