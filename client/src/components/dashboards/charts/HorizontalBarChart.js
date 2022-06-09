import React from "react";
import { HorizontalBar } from "react-chartjs-2";

function HorizontalBarChart({ data }) {
  return (
    <div>
      <HorizontalBar
        data={{
          labels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
          datasets: [
            {
              label: "Teachers",
              data: [
                data?.Teacher?.AVG_L1,
                data?.Teacher?.AVG_L2,
                data?.Teacher?.AVG_L3,
                data?.Teacher?.AVG_L4,
                data?.Teacher?.AVG_L5,
              ],
              backgroundColor: "rgba(255, 99, 132, 1)",
            },
            {
              label: "Administrators",
              data: [
                data?.Administrator?.AVG_L1,
                data?.Administrator?.AVG_L2,
                data?.Administrator?.AVG_L3,
                data?.Administrator?.AVG_L4,
                data?.Administrator?.AVG_L5,
              ],
              backgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
              label: "Managers",
              data: [
                data?.Manager?.AVG_L1,
                data?.Manager?.AVG_L2,
                data?.Manager?.AVG_L3,
                data?.Manager?.AVG_L4,
                data?.Manager?.AVG_L5,
              ],
              backgroundColor: "rgba(255, 206, 86, 1)",
            },
            {
              label: "Students",
              data: [
                data?.Student?.AVG_L1,
                data?.Student?.AVG_L2,
                data?.Student?.AVG_L3,
                data?.Student?.AVG_L4,
                data?.Student?.AVG_L5,
              ],
              backgroundColor: "rgba(102, 205, 170, 1)",
            },
          ],
        }}
        height={500}
        width={500}
        options={{
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontSize: 12,
            },
          },
        }}
      />
    </div>
  );
}

export default HorizontalBarChart;
