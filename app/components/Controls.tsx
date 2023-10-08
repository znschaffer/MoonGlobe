import {
  Button,
  Card,
  Checkbox,
  IconButton,
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
  function toggleMap() {
    setFilters((prev) => {
      return {
        ...prev,
        heatMap: !prev.heatMap,
      };
    });
  }
  function advanceYear() {
    setFilters((prev) => {
      return {
        ...prev,
        year: Math.min(prev.year + 1, 1977),
      };
    });
  }

  return (
    <>
      {/* <Card className="fixed z-10 p-2 pr-4 text-white left-8 top-8 bg-opacity-80" color="gray">
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
              e.stopPropagation()
              toggleLayer(data.key)
            }}
          />
        ))}
      </Card> */}
      <div className="fixed z-10 flex justify-center w-full bottom-16">
        <Card className="p-4 bg-opacity-80" color="gray">
          <Button onClick={toggleMap}>Change Heat Map</Button>
          <Typography variant="h3" className="m-auto">
            1969 - {filters.year}
          </Typography>
          <IconButton
            onClick={advanceYear}
            color="yellow"
            className="m-auto rounded-full"
          >
            <i className="fa-solid fa-arrow-right" />
          </IconButton>
        </Card>
      </div>
    </>
  );
}
