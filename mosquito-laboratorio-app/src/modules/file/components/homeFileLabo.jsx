import { Table, Input, Button, IconButton, Tooltip, Whisper, FlexboxGrid, InputGroup, Loader, Pagination } from 'rsuite';
import { FaEdit, FaDownload, FaSearch, FaSync, FaPlus, FaExclamation, FaFilter, FaRegFilePdf, FaMicroscope, FaFlask } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GetHistoryForLab } from '../services/historyForLab';
import { useEffect, useState } from 'react';
import { GetFileDetails } from '../services/GetUpdateFile';
import { useDispatch } from 'react-redux';
import { setUpdateFile } from '../../../redux/updateFileSlice';
import TestForm from '../../test/components/testForm';
import { useSelector } from 'react-redux';
import { decodeToken } from '../../../pages/layout/utils/decoder';
import FormGroup from 'rsuite/esm/FormGroup';

const { Column, HeaderCell, Cell } = Table;

const ColoredCell = ({ rowData, dataKey, children, ...props }) => {
  let backgroundColor = '';

  switch (rowData.result?.toLowerCase()) {
    case 'positivo':
      backgroundColor = '#8AABD6';
      break;
    case 'pendiente':
      backgroundColor = '#BFCDE0';
      break;
    case 'negativo':
      backgroundColor = '#FFFFFF';
      break;
    default:
      backgroundColor = '#FFFFFF';
  }

  return (
    <Cell {...props} style={{ backgroundColor, display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', fontSize: 16 }}>
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
  const dispatch = useDispatch()
  const [historyFiles, setHistoryFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [fileId, setFileId] = useState(0);
  const [diseaseName, setDiseaseName] = useState('')

  const userInfo = useSelector((state) => state.user.user);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }


  useEffect(() => {
    let data = [];
    let userRole = decodeToken(userInfo.jwt);
    const fetchData = async () => {
      try {
        if (userRole.role === 'Employee') {
          data = await GetHistoryForLab(parseInt(userInfo.info.laboratoryId));
        } else {
          data = await GetHistoryForLab(null);
        }

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

  const handleEdit = async (fileId) => {
    // Asegúrate de que fileId sea un valor válido antes de navegar
    if (fileId) {
      const data = await GetFileDetails(fileId);
      localStorage.setItem('updateFile', JSON.stringify(data));

      navigate(`/fileformu/${fileId}`);
    } else {
      console.error('File ID is undefined or null');
      // Opcionalmente, puedes mostrar un mensaje de error al usuario
    }
  };

  //CODIGO PARA ACTUALIZAR LAS FICHAS
  const fetchData = async () => {
    setLoading(true); // Muestra un indicador de carga mientras se actualizan los datos
    let data = [];
    let userRole = decodeToken(userInfo.jwt);
    try {
      if (userRole.role === 'Employee') {
        data = await GetHistoryForLab(parseInt(userInfo.info.laboratoryId));
      } else {
        data = await GetHistoryForLab(null);
      }

      if (data != null) {
        setHistoryFiles(data);
      }
    } catch (err) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false); // Oculta el indicador de carga cuando se complete la actualización
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };
  //
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', padding: '20px', overflow: 'hidden' }}>
      {/* Filtros */}
      <FlexboxGrid justify="start" style={{ marginBottom: 10, gap: 20 }} gutter={10}>
        {/* Primera Columna de Inputs */}
        <FlexboxGrid.Item colspan={5} style={{ marginBottom: 5 }}>
          <FormGroup controlId="patientCode">
            <Input
              placeholder="Código del paciente"
              style={{ width: '100%' }}
            />
          </FormGroup>
          <FormGroup controlId="ci">
            <Input
              placeholder="Cédula de identidad"
              style={{ width: '100%', marginTop: 10 }}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Segunda Columna de Inputs */}
        <FlexboxGrid.Item colspan={5} style={{ marginBottom: 5 }}>
          <FormGroup controlId="names">
            <Input
              placeholder="Nombres"
              style={{ width: '100%' }}
            />
          </FormGroup>
          <FormGroup controlId="firstLastName">
            <Input
              placeholder="Primer Apellido"
              style={{ width: '100%', marginTop: 10 }}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Tercera Columna de Inputs */}
        <FlexboxGrid.Item colspan={5} style={{ marginBottom: 5 }}>
          <FormGroup controlId="secondLastName">
            <Input
              placeholder="Segundo Apellido"
              style={{ width: '100%' }}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Botones de Buscar y Refrescar */}
        <FlexboxGrid.Item colspan={3} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Button appearance="primary" color="blue" size="md" style={{ fontSize: 16 }}>
            <FaSearch style={{ marginRight: 5, width: 25 }} /> Buscar
          </Button>

        </FlexboxGrid.Item>

      </FlexboxGrid>

      {/* Contenedor para la tabla con scroll */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', position: 'relative' }}>
        {/* Tabla de Registros */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Loader size="lg" content="Cargando..." />
          </div>
        ) : (
          <Table height={560} data={historyFiles} rowHeight={100} style={{ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }}>

            <Column width={85} fixed >
              <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Acciones</HeaderCell>
              <Cell >
                {(rowData) => (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                      <IconButton
                        icon={<FaEdit />}
                        appearance="ghost"
                        style={{ color: 'black', border: 'Transparent', fontSize: '22px', padding: 5 }}
                        onClick={() => handleEdit(rowData.id)}
                      />
                    </Whisper>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Vista previa</Tooltip>}>
                      <IconButton
                        icon={<FaRegFilePdf />}
                        appearance="ghost"
                        color="blue"
                        style={{ color: 'black', border: 'Transparent', marginTop: 5, fontSize: '24px', padding: 5 }}
                      />
                    </Whisper>
                  </div>
                )}
              </Cell>
            </Column>
            <Column width={90} fixed >
              <HeaderCell style={{ fontSize: '16px' }}>Resultado</HeaderCell>
              <Cell>
                {(rowData) => (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {rowData.status === 0 ? (
                      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Crear resultado</Tooltip>}>
                        <IconButton
                          icon={<FaMicroscope />}
                          appearance="ghost"
                          onClick={() => {
                            setFileId(rowData.id);
                            setDiseaseName(rowData.diseaseName)
                            handleOpenModal();
                          }}
                          style={{ color: 'black', border: 'Transparent', marginTop: 18, fontSize: '24px', padding: 5 }}
                        />
                      </Whisper>
                    ) : (
                      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar resultado</Tooltip>}>
                        <IconButton
                          icon={<FaFlask />}
                          appearance="ghost"
                          // onClick={() => {
                          //   setFileId(rowData.id);
                          //   handleOpenModal();
                          // }}
                          style={{ color: 'black', border: 'Transparent', marginTop: 18, fontSize: '24px', padding: 5 }}
                        />
                      </Whisper>
                    )}
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
            <Column width={110} resizable >
              <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Estado</HeaderCell>
              <ColoredCell dataKey="result" />
            </Column>

            <Column width={180} resizable >
              <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Estado de muestra</HeaderCell>
              <ColoredCell dataKey="status" >
                {(rowData) => (
                  <span>
                    {rowData.status === 0 ? 'Sin resultado' : rowData.status === 1 ? 'Con resultado' : rowData.status}
                  </span>
                )}
              </ColoredCell>
            </Column>

            <Column width={140} resizable>
              <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Enfermedad</HeaderCell>
              <ColoredCell dataKey="diseaseName" />
            </Column>

            <Column width={120} resizable>
              <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Código De Ficha</HeaderCell>
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

            <Column width={170} resizable>
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
          </Table >
        )
        }
      </div >
      <div >
        <Pagination prev next first last ellipsis boundaryLinks size="sm" maxButtons={5} layout={['-', 'pager']} />
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
          borderTop: '2px solid #ccc',
        }}
      >
        {/* Botón para Agregar Ficha */}
        <Button appearance="primary" color="blue" size="lg" onClick={() => navigate('/fileform')}>
          <FaPlus style={{ marginRight: 10 }} /> Agregar Ficha
        </Button>

        {/* Botón para Actualizar */}
        <Button appearance="primary" color="blue" size="lg" onClick={handleRefresh} >
          <FaSync style={{ marginRight: 10 }} /> Actualizar
        </Button>
      </div>

      <TestForm open={showModal} hiddeModal={handleCloseModal} fileId={fileId} diseaseName={diseaseName} />
    </div >
  );
}

