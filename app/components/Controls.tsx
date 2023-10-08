import { Card, Checkbox, Slider, Typography } from "@material-tailwind/react"
import { Config } from "../data/defaultConfig"

export default function Controls({
  config,
  toggleConfig,
  toggleLayer,
}: {
  config: Config
  toggleConfig: (key: string) => void
  toggleLayer: (key: string) => void
}) {
  return (
    <>
      <Card className="fixed z-10 p-2 pr-4 text-white left-8 top-8 bg-opacity-80" color="gray">
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
      </Card>

      <Card className="fixed z-10 p-4 bg-opacity-80 bottom-8 left-1/2" color="gray">
        <Slider defaultValue={50} color="gray" />
        <Typography className="m-auto">1970 - 1979</Typography>
      </Card>
    </>
  )
}
