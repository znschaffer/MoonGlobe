"use client";
import { useState, useEffect } from "react";
import MGlobe from "./components/MGlobe";
import Date from "./components/controls/Date";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  return mounted ? (
    <div>
      <Date />
      <MGlobe />
    </div>
  ) : (
    <div />
  );
}
