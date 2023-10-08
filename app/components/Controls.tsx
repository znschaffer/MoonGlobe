import {
  Button,
  Card,
  Checkbox,
  Slider,
  Typography,
} from "@material-tailwind/react";
import { Config } from "../data/defaultConfig";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { parse } from "date-fns";
import { filter } from "d3";

export default function Controls({
  filters,
  setFilters,
  config,
  toggleConfig,
  toggleLayer,
}: {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  config: Config;
  toggleConfig: (key: string) => void;
  toggleLayer: (key: string) => void;
}) {
  function advanceYear() {
    setFilters((prev) => {
      return {
        year: prev.year + 1,
      };
    });
  }

  return (
    <>
      <Card
        className="fixed z-10 p-2 pr-4 text-white left-8 top-8 bg-opacity-80"
        color="gray"
      >
        {config.toggle.map((data) => (
          <Checkbox
            ripple={false}
            label={data.title}
            key={data.key}
            color="red"
            checked={data.on}
            onChange={() => toggleConfig(data.key)}
          />
        ))}
        {config.layers.map((data) => (
          <Checkbox
            ripple={false}
            label={data.title}
            key={data.key}
            color="red"
            checked={data.on}
            onChange={(e) => {
              e.stopPropagation();
              toggleLayer(data.key);
            }}
          />
        ))}
      </Card>

      <Card
        className="fixed z-10 p-4 bg-opacity-80 bottom-8 left-1/2"
        color="gray"
      >
        <Button onClick={advanceYear}>-></Button>
        <Typography>{filters.year}</Typography>
      </Card>
    </>
  );
}
