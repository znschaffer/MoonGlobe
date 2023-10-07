"use client"
import { useState, useEffect } from "react"
import Globe from "./components/Globe"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true)
    }
  }, [])

  return mounted ? <Globe /> : <div />
}
