import invariant from "tiny-invariant";

type Elems = {
  wdir: number;
  srad: number;
  rhum: number;
  wspd: number;
  temp: number;
};

type ExtraElems = {
  vX: number;
  name: string;
  vN: number;
};

export type Station = {
  activeStatus: boolean;
  affiliation: string;
  affiliationUrl: string;
  elems: Elems;
  elev: number;
  extraelems: string | ExtraElems[];
  id: string;
  isIcao: boolean;
  lat: number;
  lon: number;
  name: string;
  srqual: boolean;
  startYear: number;
  state: string;
};

export type StationCombobox = {
  id: string;
  name: string;
  activeStatus: boolean;
};

export async function getStationList(): Promise<Station[]> {
  const url = process.env.STATION_LIST_URL;
  invariant(url, "url not found");
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
