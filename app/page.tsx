"use client"
import { useState, useEffect } from "react"
import MGlobe from "./components/MGlobe"
import Controls from "./components/Controls"

export type Config = {
  title: string
  key: string
  on: boolean
}[]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [config, setConfig] = useState([
    {
      title: "Latitude/Longitude",
      key: "showGraticules",
      on: true,
    },
    {
      title: "Atmosphere",
      key: "showAtmosphere",
      on: true,
    },
  ])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true)
    }
  }, [])

  function toggleConfig(key: string) {
    setConfig(config.map((option) => (option.key === key ? { ...option, on: !option.on } : option)))
  }

  return mounted ? (
    <div>
      <Controls config={config} toggleConfig={toggleConfig} />
      <MGlobe config={config} />
    </div>
  ) : (
    <div />
  )
}
