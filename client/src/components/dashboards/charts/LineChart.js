import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ data }) {
  console.log(data);
  return (
    <div>
      <Line
        data={{
          labels: data?.Dates,
          datasets: [
            {
              label: "Global",
              data: data?.AVG_G,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "Dimension A",
              data: data?.AVG_A,
              fill: false,
              borderColor: "rgba(255,45,45,1)",
            },
            {
              label: "Dimension B",
              data: data?.AVG_B,
              fill: false,
              borderColor: "rgba(255,178,45,1)",
            },
            {
              label: "Dimension C",
              data: data?.AVG_C,
              fill: false,
              borderColor: "rgba(227,255,45,1)",
            },
            {
              label: "Dimension D",
              data: data?.AVG_D,
              fill: false,
              borderColor: "rgba(40,119,255,1)",
            },
            {
              label: "Dimension E",
              data: data?.AVG_E,
              fill: false,
              borderColor: "rgba(255,40,119,1)",
            },
            {
              label: "Level 1",
              data: data?.AVG_L1,
              fill: false,
              borderColor: "rgba(9,0,142,1)",
            },
            {
              label: "Level 2",
              data: data?.AVG_L2,
              fill: false,
              borderColor: "rgba(18,159,122,1)",
            },
            {
              label: "Level 3",
              data: data?.AVG_L3,
              fill: false,
              borderColor: "rgba(50,234,0,1)",
            },
            {
              label: "Level 4",
              data: data?.AVG_L4,
              fill: false,
              borderColor: "rgba(136,0,234,1)",
            },
            {
              label: "Level 5",
              data: data?.AVG_L5,
              fill: false,
              borderColor: "rgba(91,255,246,1)",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 5,
                },
              },
            ],
          },
        }}
        width={500}
        height={500}
      />
    </div>
  );
}

export default LineChart;
