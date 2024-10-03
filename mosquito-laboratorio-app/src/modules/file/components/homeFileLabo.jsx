import { Table, Input, Button, IconButton, Tooltip, Whisper, FlexboxGrid, InputGroup } from 'rsuite';
import { FaEdit, FaDownload, FaSearch, FaSync, FaPlus, FaExclamation, FaFilter, FaRegFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GetHistoryForLab } from '../services/historyForLab';
import { useEffect, useState } from 'react';

const { Column, HeaderCell, Cell } = Table;

const ColoredCell = ({ rowData, dataKey, children, ...props }) => {
  let backgroundColor = '';

  switch (rowData.result) { 
    case 'Positivo':
      backgroundColor = '#8AABD6';

      break;
    case 'Pendiente':
      backgroundColor = '#BFCDE0';
      break;
    case 'Negativo':
      backgroundColor = '#FFFFFF';
      break;
    default:
      backgroundColor = '#FFFFFF';
  }

  return (
    <Cell {...props} style={{ backgroundColor, display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle' }}>
      {children ? children(rowData) : rowData[dataKey]}
    </Cell>
  );
};

//Funcion para filtrar correctamente las fechas
function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('es-ES', options);
}

export default function RecordsView() {
  const navigate = useNavigate()

  const [historyFiles, setHistoryFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetHistoryForLab();
        if (data != null) {
          setHistoryFiles(data);
        }
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
      {/* Alerta de Descarga */}
      <div
        style={{
          backgroundColor: '#BFCDE0',
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
          style={{ backgroundColor: 'black', marginRight: '10px', fontSize: '12px'}}
        />
        <p style={{ margin: 0 }}>
          <strong style={{ fontSize: '17px' }}>Solo puede realizar dos descargas diarias.</strong>
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
        <Table height={800} data={ historyFiles } rowHeight={100} style={{ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }}>
          <Column width={90} fixed >
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Acciones</HeaderCell>
            <Cell >
              {(rowData) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                    <IconButton
                      icon={<FaEdit />}
                      appearance="ghost"
                      style={{ color: 'black', border: 'Transparent', fontSize: '18px' }}
                    />
                  </Whisper>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Reporte PDF</Tooltip>}>
                    <IconButton
                      icon={<FaRegFilePdf />}
                      appearance="ghost"
                      color="blue"
                      style={{ color: 'black', border: 'Transparent', marginTop: 3, fontSize: '18px' }}
                    />
                  </Whisper>
                </div>
              )}
            </Cell>
          </Column>
          {false && (
          <Column width={120} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>id</HeaderCell>
            <ColoredCell dataKey="id" />
          </Column>
          )}
          <Column width={120} resizable >
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Estado</HeaderCell>
            <ColoredCell dataKey="result" />
          </Column>

          <Column width={180} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Estado de muestra</HeaderCell>
            <ColoredCell dataKey="status">
              {(rowData) => (
                <span>
                  {rowData.status === 0 ? 'Sin resultado' : rowData.status === 1 ? 'Con resultado' : rowData.status}
                </span>
              )}
            </ColoredCell>
          </Column>

          <Column width={120} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Código</HeaderCell>
            <ColoredCell dataKey="code">
              {(rowData) => <span>{rowData.code || 'N/A'}</span>}
            </ColoredCell>
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
            <ColoredCell dataKey="secondLastName">
              {(rowData) => <span>{rowData.secondLastName || 'N/A'}</span>}
            </ColoredCell>
          </Column>

          <Column width={180} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Fecha de Nacimiento</HeaderCell>
            <ColoredCell dataKey="birthDate">
              {(rowData) => <span>{formatDate(rowData.birthDate)}</span>}
            </ColoredCell>
          </Column>

          <Column width={180} resizable>
            <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Fecha de Notificación</HeaderCell>
            <ColoredCell dataKey="registerDate">
              {(rowData) => <span>{formatDate(rowData.registerDate)}</span>}
            </ColoredCell>
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
        <Button appearance="primary" color="blue" size="lg" onClick={() => navigate('/fileform')}>
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

