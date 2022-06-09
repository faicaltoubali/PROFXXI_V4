import React from "react";
import { Bar } from "react-chartjs-2";

function DistanceBarChart({ data, data2 = {}, data3 = {} }) {
  return (
    <div>
      <Bar
        data={{
          labels: [
            "Teaching Staff",
            "Manager Staff",
            "Administrative Staff",
            "Students",
          ],
          datasets: [
            {
              label: data?.unitName || "Empty",
              data: [
                data?.data?.Teacher,
                data?.data?.Manager,
                data?.data?.Administrator,
                data?.data?.Student,
              ],
              backgroundColor: "rgba(75,192,192,1)",
            },
            {
              label: data2?.unitName || "Empty",
              data: [
                data2?.data?.Teacher,
                data2?.data?.Manager,
                data2?.data?.Administrator,
                data2?.data?.Student,
              ],
              backgroundColor: "rgba(255, 99, 132, 1)",
            },
            {
              label: data3?.unitName
                ? "University:" + data3?.unitName
                : "Empty",
              data: [
                data3?.data?.Teacher,
                data3?.data?.Manager,
                data3?.data?.Administrator,
                data3?.data?.Student,
              ],
              backgroundColor: "rgba(255, 206, 86, 1)",
            },
          ],
        }}
        height={500}
        width={500}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 4,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default DistanceBarChart;
