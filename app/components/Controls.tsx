import { Card, Checkbox, Typography } from "@material-tailwind/react"
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
      <Card className="fixed z-10 p-2 left-8 top-8 bg-opacity-80">
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
            onChange={() => toggleLayer(data.key)}
          />
        ))}
      </Card>

      <Card className="fixed z-10 p-2 bg-white bottom-8 left-1/2 bg-opacity-80">
        <Typography variant="h2">1993</Typography>
      </Card>
    </>
  )
}
