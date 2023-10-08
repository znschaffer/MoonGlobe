"use client";
import dynamic from "next/dynamic";
import { Config, defaultData } from "../data/defaultConfig";
import { parseDate, scale } from "../helpers";
import { parse } from "date-fns";
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });
export default function MGlobe({
  config,
  data,
  filters,
}: {
  config: Config;
  filters: Filters;
  data: any;
}) {
  function getType(d: string) {
    if (d.startsWith("A")) return `Deep Moonquake`;
    if (d.includes("LM")) return "Lunar Module";
    if (d.includes("S-IVB")) return "Saturn IVB";
    switch (d) {
      case "SH":
        return "Shallow Depth";
      case "M":
        return "Natural Impact";
      default:
        return "Artificial Impact";
    }
  }

  let filteredData = data.filter((d: any) => {
    let year = parse(
      d.Date,
      "yyMMddHHmm",
      new Date("1970/01/01"),
    ).getFullYear();
    return (
      year.toString() == filters.yearRange[Number(filters.selectedYearIndex)]
    );
  });
  type dataPoint = {
    Date: string;
    Type: string;
    lat: number;
    lng: number;
    Depth: number;
    Seconds: number;
  };

  console.log(filteredData);
  let pointLabel = (d: dataPoint) => `
        <strong>${parseDate(d?.Date)}</strong>
        <p>Type: ${getType(d.Type)}</p>
        <p>Latitude: ${d.lat}°</p>
       <p>Longitude: ${d.lng}°</p>
       <p>Depth: ${d.Depth} km</p>
       <p>Duration: ${d.Seconds} seconds</p>`;

  let labelText = (d: dataPoint) => `${getType(d.Type)}`;

  const hasPoints = config.layers.find(({ key }) => key === "points")?.on;
  const hasLabels = config.layers.find(({ key }) => key === "labels")?.on;
  const hasRings = config.layers.find(({ key }) => key === "rings")?.on;

  function getPointColor(d: string) {
    if (d.startsWith("A")) return "white";
    if (d.includes("LM")) return "purple";
    if (d.includes("S-IVB")) return "red";
    switch (d) {
      case "SH":
        return "yellow";
      case "M":
        return "blue";
      default:
        return "white";
    }
  }

  return (
    <Globe
      {...defaultData}
      {...config.toggle.reduce(
        (acc, { title, key, on }) => ({ ...acc, [key]: on }),
        {},
      )}
      pointLabel={hasPoints ? pointLabel : undefined}
      labelsData={filteredData ?? []}
      labelText={labelText}
      ringsData={filteredData ?? []}
      pointsData={hasPoints ? filteredData : undefined}
      pointRadius={hasPoints ? 0.4 : undefined}
      ringMaxRadius={(d) => (hasRings ? Math.pow(data.Depth, 1 / 8) * 1.2 : 0)}
      ringColor={(d: dataPoint) => getPointColor(d.Type)}
      ringRepeatPeriod={200}
      ringAltitude={6}
      pointAltitude={
        hasPoints ? (d: any) => scale(d.Seconds, 0, 200, 0.0, 0.5) : 0
      }
      pointColor={(d: dataPoint) => getPointColor(d.Type)}
    />
  );
}
