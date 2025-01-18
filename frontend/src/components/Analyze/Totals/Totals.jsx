import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const Totals = ({ metrics }) => { 
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { borderColor: "rgb(96, 165, 250)", borderWidth: 2 },
      point: { radius: 0 },
    },
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border mb-6 dark:bg-bgCopnents dark:text-white dark:border-borderDarkmode">
      <h2 className="text-lg font-semibold mb-4">Totals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {metrics?.map((metric, index) => {
          const chartData = {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
              {
                data: metric.data,
                fill: true,
                backgroundColor: "rgba(96, 165, 250, 0.3)",
              },
            ],
          };
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full h-20 sm:h-24 md:h-32">
                <Line options={chartOptions} data={chartData} />
              </div>
              <div className="text-center mt-2">
                <p className="text-sm text-gray-500 dark:text-white">{metric.title}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {metric.value}
                  {metric.trend && (
                    <span className="text-green-500 text-sm">
                      {" "}
                      {metric.trend}
                    </span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Totals;