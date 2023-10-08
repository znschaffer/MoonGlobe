"use client";
import dynamic from "next/dynamic";
import { Config, defaultData } from "../data/defaultConfig";
import { parseDate, scale } from "../helpers";
import { parse } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
let Globe = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;
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

  const globeEl = useRef<GlobeMethods>();

  let [ringData, setRingData] = useState<dataPoint[]>(data);
  let [filteredData, setFilteredData] = useState<dataPoint[]>(data);

  useEffect(() => {
    setFilteredData((prevState) =>
      data.filter((d: any) => {
        let year = parse(
          d.Date,
          "yyMMddHHmm",
          new Date("1970-01-01"),
        ).getFullYear();
        return year == filters.year;
      }),
    );
    console.log("filteredData: ", filteredData);
  }, [filters]);

  type dataPoint = {
    Date: string;
    Type: string;
    lat: number;
    lng: number;
    Depth: number;
    Seconds: number;
  };

  let pointLabel = (d: dataPoint) => `
        <strong>${parseDate(d?.Date)}</strong>
        <p>Type: ${getType(d.Type)}</p>
        <p>Latitude: ${d.lat}°</p>
       <p>Longitude: ${d.lng}°</p>
       <p>Depth: ${d.Depth} km</p>
       <p>Duration: ${d.Seconds} seconds</p>`;

  let labelText = (d: dataPoint) => `${getType(d.Type)}`;

  useEffect(() => {
    const g = globeEl.current.controls();
    g.update();
    g.autoRotate = true;
    g.autoRotateSpeed = 0.1;
  }, []);
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
      ref={globeEl}
      pointLabel={pointLabel}
      labelsData={filteredData.slice()}
      labelText={labelText}
      ringsData={hasRings ? filteredData : []}
      pointsData={hasPoints ? filteredData : []}
      pointRadius={0.4}
      ringMaxRadius={(d) => (hasRings ? Math.pow(d.Depth, 1 / 8) * 1.2 : 0)}
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
