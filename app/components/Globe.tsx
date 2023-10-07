"use client"
import { useEffect, useState } from "react"
import Globe from "react-globe.gl"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true)
    } else {
      setMounted(false)
    }
  }, [])

  return mounted ? <Globe globeImageUrl={"./moon_map_small.jpeg"} showGraticules={true} /> : <div />
}
