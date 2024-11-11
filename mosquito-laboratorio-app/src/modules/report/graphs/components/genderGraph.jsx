import { Pie } from "react-chartjs-2";
import { React, useEffect, useState} from "../hooks/useReacts"
import { getGenderReportData, getAgeDistributionData, getTotalPatients } from "../repositories/reportRepository";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Grid, Row, Col, Panel, FlexboxGrid, Divider, Loader } from 'rsuite';

Chart.register(ArcElement, Tooltip, Legend);

export default function PieGraph() {
    const [totalPatients, setTotalPatients] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const data = await getTotalPatients();
            setTotalPatients(data);
        }
        fetchData();
    }, []);
  

    return (
        <Panel bordered shaded>
            <FlexboxGrid justify="space-around">
                <FlexboxGrid.Item >
                <ReportByGender/>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item >
                <ReportByAge/>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <Divider/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Panel shaded bordered bodyFill style={{ width: 240 }}>
                    <Panel header='Total de Pacientes:'>
                        <h2 style={{ textAlign: 'center', margin: 0 }}>
                            {totalPatients !== null ? totalPatients : <Loader size="md" content="Cargando" />} 
                        </h2>
                    </Panel>
                </Panel>
            </div>
        </Panel>
    );
}

function ReportByGender () {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
      async function fetchData() {
          const data = await getGenderReportData();
          setChartData(data);
      }
      fetchData();
  }, []);

  return (
      <div style={{ textAlign: 'center' }}>
          <h3 style={{ 
            marginBottom: '20px',
            color: '#34495e',
            fontSize: '18px',
            fontWeight: '800'
          }}>
            Distribución de Género
          </h3>
          <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            {chartData ? <Pie data={chartData} /> : <Loader size="lg" content="Cargando" />}
          </div>
      </div>
  );
}

function ReportByAge () {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
      async function fetchData() {
          const data = await getAgeDistributionData();
          setChartData(data);
      }
      fetchData();
  }, []);

  return (
      <div style={{ textAlign: 'center' }}>
          <h3 style={{ 
            marginBottom: '20px',
            color: '#34495e',
            fontSize: '18px',
            fontWeight: '800'
          }}>
            Distribución de Edad (Menores vs. Mayores)
          </h3>
          <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            {chartData ? <Pie data={chartData} /> : <Loader size="lg" content="Cargando" />}
          </div>
      </div>
  );
}