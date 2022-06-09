import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ data }) {
  return (
    <div>
      <Pie
        data={{
          labels: ["Teaching Staff", "Administrators", "Managers", "Students"],
          datasets: [
            {
              data: [
                data?.Teacher,
                data?.Administrator,
                data?.Manager,
                data?.Student,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(102, 205, 170, 1)",
              ],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return currentValue + " (" + percentage + "%)";
              },
              title: function (tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              },
            },
          },
        }}
        width={350}
        height={350}
      />
    </div>
  );
}

export default PieChart;
