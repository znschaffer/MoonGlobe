"use client"
import { useState, useEffect } from "react"
import MGlobe from "./components/MGlobe"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true)
    }
  }, [])

  return mounted ? (
    <div>
      <div className="fixed z-10 w-1/2 h-12 bg-red-400 top-50vh left-12">hello</div>
      <MGlobe />
    </div>
  ) : (
    <div />
  )
}
