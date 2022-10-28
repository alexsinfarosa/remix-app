import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import type { Station } from "~/models/station.server";

export default function StationListCombobox({
  options,
}: {
  options: Station[];
}) {
  const [query, setQuery] = useState("");
  const [selectedStation, setSelectedStation] = useState(null);

  const filteredStationList =
    query === ""
      ? options
      : options.filter((station: Station) => {
          return station.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={selectedStation} onChange={setSelectedStation}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        NEWA Station
      </Combobox.Label>
      <div className="relative mt-1 w-96">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(station: Station) => station?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredStationList.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredStationList.map((station: Station) => (
              <Combobox.Option
                key={station.id}
                value={station}
                className={({ active }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-sky-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <span
                        className={clsx(
                          "inline-block h-2 w-2 flex-shrink-0 rounded-full",
                          station.activeStatus ? "bg-green-400" : "bg-gray-200"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={clsx(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {station.name}
                        <span className="sr-only">
                          {" "}
                          is {station.activeStatus ? "online" : "offline"}
                        </span>
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={clsx(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-sky-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
