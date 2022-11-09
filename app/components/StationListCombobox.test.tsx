import { render } from "@testing-library/react";
import { getStationList } from "~/models/station.server";
import StationListCombobox from "./StationListCombobox";
import { server } from "../../mocks/index";

it("should render the stationList combobox", async () => {
  // Establish API mocking before all tests.
  beforeAll(() => server.listen());
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());
  // Clean up after the tests are finished.
  afterAll(() => server.close());

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
