import { Pie } from "react-chartjs-2";
import { React, useEffect, useState} from "../hooks/useReacts"
import { getGenderReportData, getAgeDistributionData } from "../repositories/reportRepository";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";


Chart.register(ArcElement, Tooltip, Legend);

export function PieGraph2 () {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
      async function fetchData() {
          const data = await getGenderReportData();
          setChartData(data);
      }
      fetchData();
  }, []);

  return (
      <div>
          <h3>Distribución de Género</h3>
          {chartData ? <Pie data={chartData} /> : <p>Cargando...</p>}
      </div>
  );
};

export default function PieGraph () {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
      async function fetchData() {
          const data = await getAgeDistributionData(); // Llama a la función del repositorio para obtener los datos
          setChartData(data);
      }
      fetchData();
  }, []);

  return (
      <div>
          <h3>Distribución de Edad (Menores vs. Mayores)</h3>
          {chartData ? <Pie data={chartData} /> : <p>Cargando...</p>}
      </div>
  );
};
