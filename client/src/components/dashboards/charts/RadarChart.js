import React from "react";
import { Radar } from "react-chartjs-2";

function RadarChart({ data, data2 = {}, data3 = {} }) {
  return (
    <div>
      <Radar
        data={{
          labels: [
            "Dimension A",
            "Dimension B",
            "Dimension C",
            "Dimension D",
            "Dimension E",
            "Level 1",
            "Level 2",
            "Level 3",
            "Level 4",
            "Level 5",
            "Global Mark",
          ],
          datasets: [
            {
              label: data?.unitName || "Empty",
              backgroundColor: "rgba(34, 202, 236, .2)",
              borderColor: "rgba(34, 202, 236, 1)",
              pointBackgroundColor: "rgba(220,220,220,1)",
              data: [
                data?.data?.AVG_A,
                data?.data?.AVG_B,
                data?.data?.AVG_C,
                data?.data?.AVG_D,
                data?.data?.AVG_E,
                data?.data?.AVG_L1,
                data?.data?.AVG_L2,
                data?.data?.AVG_L3,
                data?.data?.AVG_L4,
                data?.data?.AVG_L5,
                data?.data?.AVG_G,
              ],
            },
            {
              label: data2?.unitName || "Empty",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              pointBackgroundColor: "rgba(220,220,220,1)",
              data: [
                data2?.data?.AVG_A,
                data2?.data?.AVG_B,
                data2?.data?.AVG_C,
                data2?.data?.AVG_D,
                data2?.data?.AVG_E,
                data2?.data?.AVG_L1,
                data2?.data?.AVG_L2,
                data2?.data?.AVG_L3,
                data2?.data?.AVG_L4,
                data2?.data?.AVG_L5,
                data2?.data?.AVG_G,
              ],
            },

            {
              label: data3?.unitName
                ? "University: " + data3?.unitName
                : "Empty",
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              pointBackgroundColor: "rgba(220,220,220,1)",
              data: [
                data3?.data?.AVG_A,
                data3?.data?.AVG_B,
                data3?.data?.AVG_C,
                data3?.data?.AVG_D,
                data3?.data?.AVG_E,
                data3?.data?.AVG_L1,
                data3?.data?.AVG_L2,
                data3?.data?.AVG_L3,
                data3?.data?.AVG_L4,
                data3?.data?.AVG_L5,
                data3?.data?.AVG_G,
              ],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: "top",
          },
          scale: {
            ticks: {
              min: 0,
              max: 4,
              stepSize: 1,
              showLabelBackdrop: false,
              backdropColor: "rgba(203, 197, 11, 1)",
            },
            angleLines: {
              color: "rgba(170, 170, 170, 0.2)",
              lineWidth: 1,
            },
            gridLines: {
              color: "rgba(130, 130, 130, 0.8)",
              circular: true,
            },
          },
        }}
        width={500}
        height={500}
      />
    </div>
  );
}

export default RadarChart;
