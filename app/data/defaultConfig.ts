export type ConfigOption = {
  title: string;
  key: string;
  on: boolean;
};

export type Toggle = ConfigOption[];
export type Layers = ConfigOption[];

export type Config = {
  toggle: Toggle;
  layers: Layers;
};

export const defaultConfig: Config = {
  toggle: [
    {
      title: "Latitude/Longitude",
      key: "showGraticules",
      on: true,
    },
  ],
  layers: [
    {
      title: "Points",
      key: "points",
      on: true,
    },
    {
      title: "Rings",
      key: "rings",
      on: true,
    },
    // {
    //   title: "Labels",
    //   key: "labels",
    //   on: true,
    // },
  ]
}

export const defaultData = {
  bumpImageUrl: "./ldem_16.png",
  globeImageUrl: "./lroc_color_poles_8k.png",
  showAtmosphere: false,
};

