"use client"
import Globe from "react-globe.gl"

export default function MGlobe() {
  return (
    <Globe waitForGlobeReady={true} globeImageUrl={"./moon_map_small.jpeg"} showGraticules={true} />
  )
}
