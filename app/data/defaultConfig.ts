export type ConfigOption = {
  title: string
  key: string
  on: boolean
}

export type Toggle = ConfigOption[]
export type Layers = ConfigOption[]

export type Config = {
  toggle: Toggle
  layers: Layers
}


export const defaultConfig: Config = {
  toggle: [
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
  ],
  layers: [
    {
      title: "Points",
      key: "points",
      on: true,
    },
    {
      title: "Labels",
      key: "labels",
      on: true,
    },
  ],
}

export const defaultData = {
  waitForGlobeReady: true,
  bumpImageUrl: "./ldem_16.png",
  globeImageUrl: "./lroc_color_poles_8k.png",
  animateIn: true,
}