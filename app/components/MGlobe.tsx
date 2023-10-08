"use client"
import Globe from "react-globe.gl"
import MockData from "../data/mock"
import { useEffect, useState } from "react"
import { Config, defaultData } from "../data/defaultConfig"
import { parseDate, scale } from "../helpers"

export default function MGlobe({ config, data }: { config: Config; data: any }) {
  let defaultLabelLabels = (d: any) => `
        <strong>${parseDate(d?.Date)}</strong>
        <p>Type: ${d.Type}</p>
        <p>Latitude: ${d.lat}</p>
       <p>Longitude: ${d.lng}</p>
       <p>Depth: ${d.Depth}</p>
       <p>Duration: ${d.Seconds} seconds</p>
`

  const hasPoints = config.layers.find(({ key }) => key === "points")?.on

  function getPointColor(d: string) {
    if (d.startsWith("A")) return "white"
    switch (d) {
      case "SH":
        return "yellow"
      case "M":
        return "blue"
      default:
        return "white"
    }
  }

  return (
    <Globe
      {...defaultData}
      {...config.toggle.reduce((acc, { title, key, on }) => ({ ...acc, [key]: on }), {})}
      pointLabel={hasPoints ? defaultLabelLabels : undefined}
      pointRadius={hasPoints ? 0.3 : undefined}
      ringsData={data}
      ringMaxRadius={(data) => Math.pow(data.Depth, 1 / 8) * 1.2}
      ringColor={(d) => getPointColor(d.Type)}
      ringRepeatPeriod={300}
      ringAltitude={6}
      pointAltitude={hasPoints ? (d: any) => scale(d.Seconds, 0, 200, 0.0, 0.5) : 0}
      pointsData={hasPoints ? data : undefined}
      pointColor={(d) => getPointColor(d.Type)}
    />
  )
}
