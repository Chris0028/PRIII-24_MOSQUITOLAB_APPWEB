import { useState } from '../hooks/useReacts';
import { Table, Input, Button, IconButton, Tooltip, Whisper, FlexboxGrid, InputGroup } from 'rsuite';
import { FaEdit, FaDownload, FaSearch, FaSync, FaPlus, FaExclamation, FaFilter, FaChartLine } from 'react-icons/fa';

const { Column, HeaderCell, Cell } = Table; 

const ColoredCell = ({ rowData, dataKey, ...props }) => {
  let backgroundColor = '';

  switch (rowData.status) {
    case 'POSITIVO':
      backgroundColor = '#5E89BF';
      
      break;
    case 'PENDIENTE':
      backgroundColor = '#BFCDE0';
      break;
    case 'NEGATIVO':
      backgroundColor = '#FFFFFF';
      break;
    default:
      backgroundColor = '#FFFFFF';
  }

  return (
    <Cell {...props} style={{ backgroundColor, display: 'flex',  alignItems: 'center', height: '100%', justifyContent:'center', textAlign:'center', verticalAlign: 'middle'}}>
      {rowData[dataKey]}
    </Cell>
  );
};

export default function RecordsView() {
  const data = [
    {
      status: 'POSITIVO',
      sampleStatus: 'CON RESULTADO',
      code: 'CB-P-202020',
      ci: '3148475',
      names: 'JUAN',
      lastName: 'LOPEZ',
      secondLastName: 'DE TORDOYA',
      birthDate: '25/12/1965',
      notificationDate: '26/08/2024',
    },
    {
      status: 'PENDIENTE',
      sampleStatus: 'CON RESULTADO',
      code: 'CB-P-202027',
      ci: '3148475',
      names: 'PEDRO',
      lastName: 'QUIROZ',
      secondLastName: '',
      birthDate: '27/12/1965',
      notificationDate: '28/08/2024',
    },
    {
      status: 'NEGATIVO',
      sampleStatus: 'CON RESULTADO',
      code: 'CB-P-202030',
      ci: '3148475',
      names: 'TEDDY',
      lastName: 'FERNANDEZ',
      secondLastName: 'LOPEZ',
      birthDate: '29/12/1965',
      notificationDate: '29/08/2024',
    },
    {
      status: 'NEGATIVO',
      sampleStatus: 'CON RESULTADO',
      code: 'CB-P-202030',
      ci: '3148475',
      names: 'CESAR',
      lastName: 'TANGAMANDAPIO',
      secondLastName: 'LOPEZ',
      birthDate: '29/12/1965',
      notificationDate: '29/08/2024',
    },
    {
      status: 'PENDIENTE',
      sampleStatus: 'CON RESULTADO',
      code: 'CB-P-202030',
      ci: '3148475',
      names: 'NAHUEL',
      lastName: 'GUTIERREZ',
      secondLastName: 'COLQUE',
      birthDate: '29/12/1965',
      notificationDate: '29/08/2024',
    },
    {
      status: 'POSITIVO',
      sampleStatus: 'CON RESULTADO',
      code: 'CB-P-202030',
      ci: '3148475',
      names: 'CHRISTIAN',
      lastName: 'GONZALES',
      secondLastName: 'ENCINAS',
      birthDate: '29/12/1965',
      notificationDate: '29/08/2024',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
      {/* Alerta de Descarga */}
      <div
        style={{
          backgroundColor: '#E3D290',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          icon={<FaExclamation color="white" />}
          circle
          size="lg"
          style={{ backgroundColor: 'black', marginRight: '10px' }}
        />
        <p style={{ margin: 0 }}>
          <strong style={{ fontSize: '18px' }}>Solo puede realizar dos descargas diarias</strong>
        </p>
      </div>

      {/* Barra de búsqueda */}
      <FlexboxGrid justify="space-between" style={{ marginBottom: 10 }}>
        <FlexboxGrid.Item colspan={23}>
          <InputGroup inside style={{ width: '100%' }} size="lg">
            <InputGroup.Addon>
              <FaFilter />
            </InputGroup.Addon>
            <Input placeholder="Buscar..." style={{ width: '100%' }} />
            <InputGroup.Addon>
              <FaSearch />
            </InputGroup.Addon>
          </InputGroup>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={1}>
          <IconButton icon={<FaSync />} circle size="lg" style={{ marginLeft: 20 }} />
        </FlexboxGrid.Item>
      </FlexboxGrid>

      {/* Contenedor para la tabla con scroll */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
        {/* Tabla de Registros */}
        <Table height={600} data={data} rowHeight={100} style={{ fontWeight: 'bold', textAlign:'center', verticalAlign: 'middle' }}>
          <Column width={100} fixed >
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Acciones</HeaderCell>
            <Cell >
              {(rowData) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'  }}>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                    <IconButton
                      icon={<FaEdit />}
                      appearance="ghost"
                      style={{ color: 'black', border: 'Transparent', fontSize: '18px' }}
                    />
                  </Whisper>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Historial</Tooltip>}>
                    <IconButton
                      icon={<FaChartLine />}
                      appearance="ghost"
                      color="blue"
                      style={{ color: 'black', border: 'Transparent', marginTop: 3, fontSize: '18px' }}
                    />
                  </Whisper>
                </div>
              )}
            </Cell>
          </Column>

          <Column width={120} resizable >
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Estado</HeaderCell>
            <ColoredCell dataKey="status" />
          </Column>

          <Column width={180} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Estado de muestra</HeaderCell>
            <ColoredCell dataKey="sampleStatus" />
          </Column>

          <Column width={120} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Código</HeaderCell>
            <ColoredCell dataKey="code" />
          </Column>

          <Column width={120} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>CI</HeaderCell>
            <ColoredCell dataKey="ci" />
          </Column>

          <Column width={150} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Nombres</HeaderCell>
            <ColoredCell dataKey="names" />
          </Column>

          <Column width={150} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Primer Apellido</HeaderCell>
            <ColoredCell dataKey="lastName" />
          </Column>

          <Column width={180} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Segundo Apellido</HeaderCell>
            <ColoredCell dataKey="secondLastName" />
          </Column>

          <Column width={180} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Fecha de Nacimiento</HeaderCell>
            <ColoredCell dataKey="birthDate" />
          </Column>

          <Column width={180} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Fecha de Notificación</HeaderCell>
            <ColoredCell dataKey="notificationDate" />
          </Column>
        </Table>
      </div>

      {/* Footer Fijo con los botones de Agregar y Descargar */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '10px 20px',
          borderTop: '1px solid #ccc',
        }}
      >
        {/* Botón para Agregar Ficha */}
        <Button appearance="primary" color="blue" size="lg">
          <FaPlus style={{ marginRight: 10 }} /> Agregar Ficha
        </Button>

        {/* Botón para Descargar */}
        <Button appearance="primary" color="blue" size="lg">
          <FaDownload style={{ marginRight: 10 }} /> Descargar
        </Button>
      </div>
    </div>
  );
}
