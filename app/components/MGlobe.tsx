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

  const defaultLabelData = { labelText: "label", labelSize: 1.7, labelsData: MockData }
  const defaultPointsData = {
    pointLabel: defaultLabelLabels,
    pointRadius: 0.3,
    pointAltitude: (d: any) => scale(d.magnitude, 0, 10, 0.0, 0.5),
    pointsData: MockData,
  }

  const [fullConfig, setFullConfig] = useState({
    ...defaultData,
    ...defaultLabelData,
    ...defaultPointsData,
  } as Record<string, any>)

  useEffect(() => {
    const map = config.toggle.reduce((acc, { title, key, on }) => ({ ...acc, [key]: on }), {})
    const labels = config.layers.find(({ key }) => key === "labels")
    const points = config.layers.find(({ key }) => key === "points")

    if (labels && points) {
      const labelData = labels.on ? defaultLabelData : {}
      const pointsData = points.on ? defaultPointsData : {}

      console.log({
        ...defaultData,
        ...labelData,
        ...pointsData,
        ...map,
      })

      setFullConfig({
        ...defaultData,
        ...labelData,
        ...pointsData,
        ...map,
      })
    }
  }, [config.toggle, config.layers])

  return <Globe {...fullConfig} />
}
