"use client";
import { useState, useEffect } from "react";
import MGlobe from "./components/MGlobe";
import Controls from "./components/Controls";
import { defaultConfig } from "./data/defaultConfig";
import { parse, setYear } from "date-fns";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState(defaultConfig);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState<Filters>({
    yearRange: [],
    selectedYearIndex: "0",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
      let getData = async () => {
        const res = await fetch("/api/_2003_Moonquake_Data");
        const data = await res.json();
        setData(data.data);
        let tempYearRange: string[] = [];
        data.data.forEach((d: any) => {
          let year = parse(d.Date, "yyMMddHHmm", new Date("1970-01-01"))
            .getFullYear()
            .toString();
          console.log(year);
          if (!tempYearRange.includes(year)) {
            tempYearRange.push(year);
          }
        });
        setFilters((prevFilters: Filters) => ({
          ...prevFilters,
          yearRange: tempYearRange,
        }));
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
        filters={filters}
        setFilters={setFilters}
        config={config}
        toggleConfig={toggleConfig}
        toggleLayer={toggleLayer}
      />
      <MGlobe data={data} filters={filters} config={config} />
    </div>
  ) : (
    <div />
  );
}
