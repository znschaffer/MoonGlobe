"use client"
import Globe from "react-globe.gl"
import MockData from "../data/mock"
import { useEffect, useState } from "react"
import { Config, defaultData } from "../data/defaultConfig"
import { scale } from "../helpers"

export default function MGlobe({ config, data }: { config: Config; data: any }) {
  console.log(data)
  let defaultLabelLabels = (d: any) => `
        <div><b>${d.Type}</b></div>`

  const hasPoints = config.layers.find(({ key }) => key === "points")?.on
  const hasLabels = config.layers.find(({ key }) => key === "labels")?.on

  return (
    <Globe
      {...defaultData}
      {...config.toggle.reduce((acc, { title, key, on }) => ({ ...acc, [key]: on }), {})}
      // labelText={hasLabels ? "label" : undefined}
      // labelSize={hasLabels ? 1.7 : undefined}
      // labelsData={hasLabels ? data : undefined}
      pointLabel={hasPoints ? defaultLabelLabels : undefined}
      pointRadius={hasPoints ? 0.3 : undefined}
      pointAltitude={hasPoints ? (d: any) => scale(d.Seconds, 0, 200, 0.0, 0.5) : 0}
      pointsData={hasPoints ? data : undefined}
    />
  )
}
