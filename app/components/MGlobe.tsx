"use client"
import Globe from "react-globe.gl"
import MockData from "../data/mock"
import { Config } from "../page"
import { useEffect, useState } from "react"

export default function MGlobe({ config }: { config: Config }) {
  function scale(number: any, inMin: any, inMax: any, outMin: any, outMax: any) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  }

  let labelLabel = (d: any) => `
        <div><b>${d.label}</b></div>
        <div>${d.agency} - ${d.program} Program</div>
        <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
`

  const defaultOptions = {
    waitForGlobeReady: true,
    labelText: "label",
    labelSize: 1.7,
    pointLabel: labelLabel,
    labelsData: MockData,
    pointRadius: 0.3,
    pointAltitude: (d: any) => scale(d.magnitude, 0, 10, 0.0, 0.5),
    pointsData: MockData,
    bumpImageUrl: "./ldem_16.png",
    globeImageUrl: "./lroc_color_poles_8k.png",
    animateIn: true,
  }

  const [fullConfig, setFullConfig] = useState(defaultOptions)

  useEffect(() => {
    const map = config.reduce((acc, { title, key, on }) => ({ ...acc, [key]: on }), {})
    setFullConfig({
      ...fullConfig,
      ...map,
    })
  }, config)

  return <Globe {...fullConfig} />
}
