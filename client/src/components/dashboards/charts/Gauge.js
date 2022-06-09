import React from "react";
import GaugeChart from "react-gauge-chart";

function Gauge({ data }) {
  return (
    <div>
      <GaugeChart
        colors={["#EA4228", "#F5CD19", "#5BE12C"]}
        percent={data / 4}
        arcPadding={0.02}
        textColor={"#6E6F6A"}
      />
    </div>
  );
}

export default Gauge;
