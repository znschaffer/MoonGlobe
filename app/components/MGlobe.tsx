"use client";
import dynamic from "next/dynamic";
import { Config, defaultData } from "../data/defaultConfig";
import { parseDate, scale } from "../helpers";
import { parse } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { stations } from "../data/stations";
import ts from "typescript";
let Globe = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;
export default function MGlobe({
  config,
  data,
  filters,
  object,
}: {
  config: Config;
  filters: Filters;
  data: any;
  object: any;
}) {
  function getType(d: string) {
    if (d.startsWith("A")) return `Deep Moonquake`;
    if (d.includes("LM")) return "Lunar Module Impact";
    if (d.includes("S-IVB")) return "Saturn IVB Impact";
    switch (d) {
      case "SH":
        return "Shallow Depth";
      case "M":
        return "Natural Impact";
      default:
        return "Artificial Impact";
    }
  }

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
      // @ts-ignore
      bumpImageUrl={"./ldem_16.png"}
      globeImageUrl={
        filters.heatMap ? "./lola_roughness.png" : "./lroc_color_poles_2k.png"
      }
      backgroundImageUrl={"./starry_night.jpg"}
      showAtmosphere={false}
      animateIn={true}
      // {...config.toggle.reduce((acc, { title, key, on }) => ({ ...acc, [key]: on }), {})}
      pointLabel={pointLabel}
      labelsData={filteredData.slice()}
      labelText={(d) => getType(d.Type)}
      ringsData={hasRings ? filteredData : []}
      pointsData={hasPoints ? filteredData : []}
      pointRadius={0.4}
      ringMaxRadius={
        hasRings ? (d: any) => scale(d.Depth / 10, 0, 200, 0.0, 0.5) : 0
      }
      ringColor={(d: dataPoint) => getPointColor(d.Type)}
      ringRepeatPeriod={200}
      ringPropagationSpeed={0.2}
      ringAltitude={70}
      objectsData={stations}
      objectThreeObject={object}
      objectAltitude={0}
      pointAltitude={
        hasPoints ? (d: any) => scale(d.Depth / 10, 0, 200, 0.0, 0.5) : 0
      }
      pointColor={(d: dataPoint) => getPointColor(d.Type)}
    />
  );
}
