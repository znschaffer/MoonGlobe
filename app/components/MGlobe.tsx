"use client"
import Globe from "react-globe.gl"
import MockData from "../data/mock"

export default function MGlobe() {

  let labelLabel = (d: any) => `
        <div><b>${d.label}</b></div>
        <div>${d.agency} - ${d.program} Program</div>
        <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
`
  return (
    <Globe waitForGlobeReady={true} labelText="label" labelSize={1.7}
      labelLabel={labelLabel} labelsData={MockData} globeImageUrl={"./moon_map_small.jpeg"} showGraticules={true} />
  )
}
