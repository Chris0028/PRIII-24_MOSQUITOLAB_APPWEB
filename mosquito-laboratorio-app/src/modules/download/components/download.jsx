import { Table, Tooltip, Whisper, FlexboxGrid, Panel, Message, toaster } from 'rsuite';
import excel from '../../../../public/static/excel.png'
import csv1 from '../../../../public/static/csv1.png'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { exportToCSV, exportToExcel } from '../service/exportService';
import { FaExclamationCircle } from 'react-icons/fa';

export default function Download() {
  const { Column, HeaderCell, Cell } = Table;

  const location = useLocation(); // Obtén el estado pasado por navigate
  const [data, setData] = useState([]);

  const genericData = [
    {
      fileName: "reporte-generico-01",
      reportType: "excel-consolidado",
      filters: "-",
      level: "GENÉRICO",
      creationDate: "20/11/2024 - 12:00:00",
      data: [], // Datos vacíos para este ejemplo
    },
  ];

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("reports")) || [];
  
    if (location.state?.newReport) {
      console.log("Nuevo reporte recibido:", location.state.newReport);
  
      setData((prevData) => {
        const exists = prevData.some(
          (report) => report.fileName === location.state.newReport.fileName
        );
        if (!exists) {
          const updatedReports = [...prevData, location.state.newReport];
          localStorage.setItem("reports", JSON.stringify(updatedReports)); // Actualiza `localStorage`
          return updatedReports;
        }
        return prevData;
      });

      if (location.state.warningMessage) {
        toaster.push(
          <Message type="warning" header="Advertencia" closable showIcon>
            {location.state.warningMessage}
          </Message>,
          { placement: 'topCenter' }
        );
      }

      window.history.replaceState({}, document.title, location.pathname); // Limpia el estado
    } else {
      console.log("Cargando reportes desde localStorage");
      setData(storedReports.length > 0 ? storedReports : genericData);
    }
  }, [location.state]);
  
  const handleExportToExcel = (rowData) => {
    if (!rowData?.data?.length) {
      console.error("No hay datos dinámicos para exportar a Excel:", rowData);
      return;
    }
    exportToExcel(rowData);
  };
  
  const handleExportToCSV = (rowData) => {
    if (!rowData?.data?.length) {
      console.error("No hay datos dinámicos para exportar a CSV:", rowData);
      return;
    }
    exportToCSV(rowData);
  };
  


  return (
    <div style={{ padding: '20px', maxWidth: '1300px', margin: '0 auto' }}>
      <h3 style={{ fontWeight: 'bold', color: '#1B3A61', display: 'flex', textAlign: 'center', marginBottom: '30px', justifyContent: 'center', alignItems: 'center' }}>DESCARGAS DE UN REPORTE CONSOLIDADO</h3>
      <Panel bordered bodyFill style={{ marginBottom: 20, padding: 10, backgroundColor: '#E0ECF8', textAlign: 'center', display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
        <FlexboxGrid justify="center" align="middle">
          <FlexboxGrid.Item>
            <FaExclamationCircle style={{ fontSize: '22px', color: 'black', marginRight: '10px' }} />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>
              IMPORTANTE: Debe generar un reporte consolidado para poder descargarlo en formato Excel o CSV.
            </p>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Panel>
      <div style={{ overflowY: 'auto', maxHeight: '500px', borderRadius: '8px',}} ></div>
      <Table data={data} height={500} bordered cellBordered style={{ fontSize: '14px' }}>
        <Column width={300} align="center" resizable>
          <HeaderCell style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>Nombre del archivo</HeaderCell>
          <Cell dataKey="fileName" />
        </Column>

        <Column width={200} align="center" resizable>
          <HeaderCell style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>Tipo reporte</HeaderCell>
          <Cell dataKey="reportType" />
        </Column>

        <Column width={110} align="center" resizable>
          <HeaderCell style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>Filtros</HeaderCell>
          <Cell dataKey="filters" />
        </Column>

        <Column width={200} align="center" resizable>
          <HeaderCell style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>Nivel</HeaderCell>
          <Cell dataKey="level" />
        </Column>

        <Column width={250} align="center" resizable>
          <HeaderCell style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>Fecha y hora de creación</HeaderCell>
          <Cell dataKey="creationDate" />
        </Column>

        <Column width={120} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', color: 'black' }} resizable>
          <HeaderCell style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>EXCEL</HeaderCell>
          <Cell>
          {(rowData) => (
            <FlexboxGrid align="middle">
              <FlexboxGrid.Item>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Descargar Excel</Tooltip>} >
                  <img src={excel} alt='Excel' style={{ cursor: 'pointer' }} onClick={() => handleExportToExcel(rowData)} />
                </Whisper>
              </FlexboxGrid.Item>

            </FlexboxGrid>
          )}
          </Cell>
        </Column>

        <Column width={120} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', color: 'black' }} resizable>
          <HeaderCell >CSV</HeaderCell>
          <Cell>
          {(rowData) => (
            <FlexboxGrid >
              <FlexboxGrid.Item>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Descargar CSV</Tooltip>}>
                  <img src={csv1} alt='csv1' style={{ cursor: 'pointer', width: '28px' }} onClick={() => handleExportToCSV(rowData)}/>
                </Whisper>
              </FlexboxGrid.Item>

            </FlexboxGrid>
          )}
          </Cell>
        </Column>
      </Table>
    </div>
  );

}