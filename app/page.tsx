"use client";
import { useState, useEffect } from "react";
import MGlobe from "./components/MGlobe.tsx";
import Controls from "./components/Controls.tsx";
import { defaultConfig } from "./data/defaultConfig";
import { parse, setYear } from "date-fns";
import { parseDate } from "./helpers";
import * as THREE from "three";
// @ts-ignore
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
// @ts-ignore
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState(defaultConfig);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState<Filters>({
    year: 1969,
    heatMap: false,
  });

  const [object, setObject] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
      let getData = async () => {
        const res = await fetch("/api/_2003_Moonquake_Data");
        const data = await res.json();
        setData(data.data);
        let tempYearRange: string[] = [];
        data.data.forEach((d: any) => {
          if (d.Date.length == 10) {
            let year = new Date(parseDate(d.Date)).getFullYear().toString();
            if (!tempYearRange.includes(year)) {
              tempYearRange.push(year);
            }
          }
        });
        setFilters((prevFilters: Filters) => ({
          ...prevFilters,
          yearRange: tempYearRange,
        }));
      };
      getData();
    }

    new MTLLoader().load("module.mtl", function (materials) {
      materials.preload();

      new OBJLoader()
        .setMaterials(materials)
        .load("module.obj", function (obj) {
          obj.scale.set(0.04, 0.04, 0.04);
          setObject(obj);
        });
    });
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
        filters={filters}
        setFilters={setFilters}
        config={config}
        toggleConfig={toggleConfig}
        toggleLayer={toggleLayer}
      />
      <MGlobe data={data} filters={filters} config={config} object={object} />
    </div>
  ) : (
    <div />
  );
}
