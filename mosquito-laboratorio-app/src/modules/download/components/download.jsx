import { Table, Tooltip, Whisper, FlexboxGrid } from 'rsuite';
import excel from '../../../../public/static/excel.png'
import csv1 from '../../../../public/static/csv1.png'
import { useEffect, useState } from 'react';

export default function Download() {
  const { Column, HeaderCell, Cell } = Table;

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(samples)
  }, []);

  const samples = [
    {
      fileName: 'fichas-LABORATORIO-1724855156096',
      reportType: 'excel-consolidado',
      filters: '-',
      level: 'LABORATORIO',
      creationDate: '28/08/2024 - 10:25:56',

    },
    {
      fileName: 'fichas-LABORATORIO-1724855156096',
      reportType: 'excel-consolidado',
      filters: '-',
      level: 'LABORATORIO',
      creationDate: '28/08/2024 - 10:25:56',

    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1300px', margin: '0 auto' }}>
      <h3 style={{ fontWeight: 'bold', color: '#1B3A61', display: 'flex', textAlign: 'center', marginBottom: '30px', justifyContent: 'center', alignItems: 'center' }}>DESCARGAS DE UN REPORTE CONSOLIDADO</h3>
      <div
        style={{
          overflowY: 'auto',
          maxHeight: '500px', // Altura máxima con scroll

          borderRadius: '8px',
        }}
      ></div>
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

            <FlexboxGrid align="middle">
              <FlexboxGrid.Item>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Descargar Excel</Tooltip>} >
                  <img src={excel} alt='Excel' />
                </Whisper>
              </FlexboxGrid.Item>

            </FlexboxGrid>

          </Cell>
        </Column>

        <Column width={120} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', color: 'black' }} resizable>
          <HeaderCell >CSV</HeaderCell>
          <Cell>

            <FlexboxGrid >
              <FlexboxGrid.Item>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Descargar CSV</Tooltip>}>
                  <img src={csv1} alt='csv1' style={{ width: '28px' }} />
                </Whisper>
              </FlexboxGrid.Item>

            </FlexboxGrid>

          </Cell>
        </Column>
      </Table>
    </div>
  );

}