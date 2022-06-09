import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ data }) {
  return (
    <div>
      <Bar
        data={{
          labels: [
            "Dimension A",
            "Dimension B",
            "Dimension C",
            "Dimension D",
            "Dimension E",
          ],
          datasets: [
            {
              label: "Teachers",
              data: [
                data?.Teacher?.AVG_A,
                data?.Teacher?.AVG_B,
                data?.Teacher?.AVG_C,
                data?.Teacher?.AVG_D,
                data?.Teacher?.AVG_E,
              ],
              backgroundColor: "rgba(255, 99, 132, 1)",
            },
            {
              label: "Administrators",
              data: [
                data?.Administrator?.AVG_A,
                data?.Administrator?.AVG_B,
                data?.Administrator?.AVG_C,
                data?.Administrator?.AVG_D,
                data?.Administrator?.AVG_E,
              ],
              backgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
              label: "Managers",
              data: [
                data?.Manager?.AVG_A,
                data?.Manager?.AVG_B,
                data?.Manager?.AVG_C,
                data?.Manager?.AVG_D,
                data?.Manager?.AVG_E,
              ],
              backgroundColor: "rgba(255, 206, 86, 1)",
            },
            {
              label: "Students",
              data: [
                data?.Student?.AVG_A,
                data?.Student?.AVG_B,
                data?.Student?.AVG_C,
                data?.Student?.AVG_D,
                data?.Student?.AVG_E,
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

export default BarChart;

{
  // "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //        "rgba(255, 206, 86, 1)",
  //       "rgba(75, 192, 192, 2)",
  //      "rgba(153, 102, 255, 1)",
  //     "rgba(255, 159, 64, 1)",
}
