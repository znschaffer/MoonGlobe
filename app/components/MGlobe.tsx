"use client";
import Globe from "react-globe.gl";
import MockData from "../data/mock";

export default function MGlobe() {
  function scale(
    number: any,
    inMin: any,
    inMax: any,
    outMin: any,
    outMax: any,
  ) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  let labelLabel = (d: any) => `
        <div><b>${d.label}</b></div>
        <div>${d.agency} - ${d.program} Program</div>
        <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
`;
  return (
    <Globe
      waitForGlobeReady={true}
      labelSize={1.5}
      labelText={"label"}
      labelsData={MockData}
      pointLabel={labelLabel}
      pointColor={() => "#f00"}
      pointRadius={0.3}
      pointAltitude={(d: any) => scale(d.magnitude, 0, 10, 0.0, 0.5)}
      pointsData={MockData}
      bumpImageUrl={"./ldem_16.png"}
      globeImageUrl={"./lroc_color_poles_8k.png"}
      showGraticules={true}
    />
  );
}
