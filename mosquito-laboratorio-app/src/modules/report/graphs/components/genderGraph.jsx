import { Pie } from 'react-chartjs-2';

export const PieChart = () => {
  const data = {
    labels: ['Hombres', 'Mujeres'], // Etiquetas para cada segmento del gráfico
    datasets: [
      {
        label: 'Distribución por Género',
        data: [300, 200], // Datos correspondientes a hombres y mujeres
        backgroundColor: ['#36A2EB', '#FF6384'], // Colores para cada segmento
        hoverBackgroundColor: ['#36A2EB80', '#FF638480'] // Colores al pasar el mouse
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Pie data={data} options={options} />;
};