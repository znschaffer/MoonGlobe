import { Card, Checkbox, Typography } from "@material-tailwind/react"

export default function Controls({ config, toggleConfig }) {
  return (
    <>
      <Card className="fixed z-10 p-2 left-8 top-8 bg-opacity-80">
        {config.map((data) => (
          <Checkbox
            ripple={false}
            label={data.title}
            color="red"
            checked={data.on}
            onChange={() => toggleConfig(data.key)}
          />
        ))}
      </Card>
      <Card className="fixed z-10 p-2 bg-white bottom-8 left-1/2 bg-opacity-80">
        <Typography variant="h2">1993</Typography>
      </Card>
    </>
  )
}
