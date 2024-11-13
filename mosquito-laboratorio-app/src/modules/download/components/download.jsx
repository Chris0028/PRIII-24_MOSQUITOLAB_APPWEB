import { Table, Input, Button, IconButton, Tooltip, Whisper, FlexboxGrid } from 'rsuite';
import { useEffect, useState } from 'react';
import excel from '../../../../public/static/excel.png'
import csv1 from '../../../../public/static/csv1.png'
import { useLocation } from 'react-router-dom';
import { exportToExcel, exportToCSV } from '../service/exportService';
import { generateTableData } from '../utils/tableDataGenerator';

export default function Download({ rawData, role }){
    const { Column, HeaderCell, Cell } = Table;
    const [data, setData] = useState([]);
    const location = useLocation();
    const reportData = location.state?.reportData || [];

    useEffect(() => {
      // Recuperar los datos de localStorage
      const rawData = JSON.parse(localStorage.getItem('reportData')) || [];
      console.log('Datos recuperados de localStorage:', rawData);
      const role = "Employee"; // Asegúrate de definir el rol o pasarlo como prop
  
      // Generar los datos de la tabla basados en el rol
      const generatedData = generateTableData(rawData, role);
      console.log('Datos generados para la tabla:', generatedData);
      setData(generatedData);
      console.log('Estado data después de setData:', generatedData);
    }, []);
    
    return (
      <div style={{ padding: '20px', maxWidth: '1300px', margin: '0 auto' }}>
        <h3 style={{ fontWeight: 'bold', color: '#1B3A61', display:'flex', textAlign: 'center', marginBottom: '30px', justifyContent:'center', alignItems:'center' }}>DESCARGAS DE UN REPORTE CONSOLIDADO</h3>
        <div
        style={{
          overflowY: 'auto',
          maxHeight: '500px', // Altura máxima con scroll
          
          borderRadius: '8px',
        }}
      ></div>
        <Table data={reportData} height={500} bordered cellBordered style={{ fontSize: '14px' }}>
          <Column  width={300} align="center" resizable>
            <HeaderCell style={{ fontSize:'16px', fontWeight:'bold', color:'black' }}>Nombre del archivo</HeaderCell>
            <Cell  dataKey="fileName" />
          </Column>
  
          <Column width={200} align="center" resizable>
            <HeaderCell style={{ fontSize:'16px', fontWeight:'bold', color:'black' }}>Tipo reporte</HeaderCell>
            <Cell dataKey="reportType" />
          </Column>
  
          <Column width={110} align="center" resizable>
            <HeaderCell style={{ fontSize:'16px', fontWeight:'bold', color:'black' }}>Filtros</HeaderCell>
            <Cell dataKey="filters" />
          </Column>
  
          <Column width={200} align="center" resizable>
            <HeaderCell style={{ fontSize:'16px', fontWeight:'bold', color:'black' }}>Nivel</HeaderCell>
            <Cell dataKey="level" />
          </Column>
  
          <Column width={250} align="center" resizable>
            <HeaderCell style={{ fontSize:'16px', fontWeight:'bold', color:'black' }}>Fecha y hora de creación</HeaderCell>
            <Cell dataKey="creationDate" />
          </Column>
  
          <Column width={120} style={{ display:'flex', justifyContent:'center', alignItems:'center', fontSize:'16px', fontWeight:'bold', color:'black'}} resizable>
            <HeaderCell style={{ fontSize:'16px', fontWeight:'bold', color:'black' }}>EXCEL</HeaderCell>
            <Cell>
              {rowData => (
                <FlexboxGrid align="middle">
                  <FlexboxGrid.Item>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Descargar Excel</Tooltip>} >
                      <img src={excel} alt='Excel' onClick={()=>exportToExcel(data, 'Reporte_Consolidado_EXCEL')}/>
                    </Whisper>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item>
                    <span>{rowData.excelSize}</span>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              )}
            </Cell>
          </Column>

          <Column width={120} style={{ display:'flex', justifyContent:'center', alignItems:'center', fontSize:'16px', fontWeight:'bold', color:'black'}} resizable>
            <HeaderCell >CSV</HeaderCell>
            <Cell>
              {rowData => (
                <FlexboxGrid >
                  <FlexboxGrid.Item>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Descargar CSV</Tooltip>}>
                      <img src={csv1} alt='csv1' style={{width:'28px'}} onClick={()=>exportToCSV(data, 'Reporte_Consolidado_CSV')}/>
                    </Whisper>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item>
                    <span>{rowData.csvSize}</span>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
    );

}