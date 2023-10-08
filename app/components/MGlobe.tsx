"use client"
import Globe from "react-globe.gl"
import { Config, defaultData } from "../data/defaultConfig"
import { parseDate, scale } from "../helpers"

export default function MGlobe({ config, data }: { config: Config; data: any }) {
  function getType(d: string) {
    if (d.startsWith("A")) return `Deep Moonquake`
    if (d.includes("LM")) return "Lunar Module"
    if (d.includes("S-IVB")) return "Saturn IVB"
    switch (d) {
      case "SH":
        return "Shallow Depth"
      case "M":
        return "Natural Impact"
      default:
        return "Artificial Impact"
    }
  }

  let pointLabel = (d: any) => `
        <strong>${parseDate(d?.Date)}</strong>
        <p>Type: ${getType(d.Type)}</p>
        <p>Latitude: ${d.lat}°</p>
       <p>Longitude: ${d.lng}°</p>
       <p>Depth: ${d.Depth} km</p>
       <p>Duration: ${d.Seconds} seconds</p>`

  let labelText = (d) => `${getType(d.Type)}`

  const hasPoints = config.layers.find(({ key }) => key === "points")?.on
  const hasLabels = config.layers.find(({ key }) => key === "labels")?.on
  const hasRings = config.layers.find(({ key }) => key === "rings")?.on

  function getPointColor(d: string) {
    if (d.startsWith("A")) return "white"
    if (d.includes("LM")) return "purple"
    if (d.includes("S-IVB")) return "red"
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
      pointLabel={hasPoints ? pointLabel : undefined}
      labelsData={data}
      labelText={labelText}
      ringsData={data}
      pointsData={hasPoints ? data : undefined}
      pointRadius={hasPoints ? 0.4 : undefined}
      ringMaxRadius={(data) => (hasRings ? Math.pow(data.Depth, 1 / 8) * 1.2 : 0)}
      ringColor={(d) => getPointColor(d.Type)}
      ringRepeatPeriod={200}
      ringAltitude={6}
      pointAltitude={hasPoints ? (d: any) => scale(d.Seconds, 0, 200, 0.0, 0.5) : 0}
      pointColor={(d) => getPointColor(d.Type)}
    />
  )
}
