"use client"
import Globe from "react-globe.gl"
import MockData from "../data/mock"
import { useEffect, useState } from "react"
import { Config, defaultData } from "../data/defaultConfig"
import { scale } from "../helpers"

export default function MGlobe({ config }: { config: Config }) {
  let defaultLabelLabels = (d: any) => `
        <div><b>${d.label}</b></div>
        <div>${d.agency} - ${d.program} Program</div>
        <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>`

  const hasPoints = config.layers.find(({ key }) => key === "points")?.on
  const hasLabels = config.layers.find(({ key }) => key === "labels")?.on

  return (
    <Globe
      {...defaultData}
      {...config.toggle.reduce((acc, { title, key, on }) => ({ ...acc, [key]: on }), {})}
      labelText={hasLabels ? "label" : undefined}
      labelSize={hasLabels ? 1.7 : undefined}
      labelsData={hasLabels ? MockData : undefined}
      pointLabel={hasPoints ? defaultLabelLabels : undefined}
      pointRadius={hasPoints ? 0.3 : undefined}
      pointAltitude={hasPoints ? (d: any) => scale(d.magnitude, 0, 10, 0.0, 0.5) : 0}
      pointsData={hasPoints ? MockData : undefined}
    />
  )
}
