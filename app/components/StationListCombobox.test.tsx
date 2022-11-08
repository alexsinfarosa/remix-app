import { render } from "@testing-library/react";
import { getStationList } from "~/models/station.server";
import StationListCombobox from "./StationListCombobox";

test("it renders", async () => {
  const stationList = await getStationList();
  render(
    <StationListCombobox
      station={stationList[0]}
      options={stationList}
    ></StationListCombobox>
  );
  expect(stationList.length).toBe(2);
  expect(stationList[0].name).toBe("Avon");
});
