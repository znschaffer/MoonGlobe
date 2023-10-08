"use client";
import { useState, useEffect } from "react";
import MGlobe from "./components/MGlobe";
import Controls from "./components/Controls";
import { defaultConfig } from "./data/defaultConfig";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState(defaultConfig);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
      const getData = async () => {
        const res = await fetch("/api/_2003_Moonquake_Data");
        const data = await res.json();
        setData(data.data);
      };
      getData();
    }
  }, []);

  function toggleConfig(key: string) {
    setConfig({
      ...config,
      toggle: config.toggle.map((option) =>
        option.key === key ? { ...option, on: !option.on } : option,
      ),
    });
  }

  function toggleLayer(key: string) {
    setConfig({
      ...config,
      layers: config.layers.map((option) =>
        option.key === key ? { ...option, on: !option.on } : option,
      ),
    });
  }

  return mounted ? (
    <div>
      <Controls
        config={config}
        toggleConfig={toggleConfig}
        toggleLayer={toggleLayer}
      />
      <MGlobe data={data} config={config} />
    </div>
  ) : (
    <div />
  );
}
