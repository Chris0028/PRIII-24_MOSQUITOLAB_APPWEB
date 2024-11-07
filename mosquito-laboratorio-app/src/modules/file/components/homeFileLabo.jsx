import { Table, Input, Button, IconButton, Tooltip, Whisper, FlexboxGrid, Loader, Pagination } from 'rsuite';
import { FaEdit, FaSearch, FaSync, FaPlus, FaRegFilePdf, FaMicroscope, FaFlask, FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GetHistoryForLab } from '../services/historyForLab';
import { useEffect, useState } from 'react';
import { GetFileDetails } from '../services/GetUpdateFile';
import { useDispatch } from 'react-redux';
import { setUpdateFile } from '../../../redux/updateFileSlice';
import TestForm from '../../test/components/testForm';
import { useSelector } from 'react-redux';
import { decodeToken } from '../../../utils/decoder';
import FormGroup from 'rsuite/esm/FormGroup';
import ResultFilePDF from '../../pdf/sampleResult/components/sampleResultFile';
import ResultViewer from '../../pdf/sampleResult/components/resultViewer';
import { historyFilterLAsync } from '../services/historyFileFilterL';

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
    <Cell {...props} style={{ backgroundColor, display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', fontSize: 16, color: 'black' }}>
      {children ? (children(rowData)) : rowData[dataKey] === 'Positivo' ? (
        <span style={{ color: 'white' }}>{rowData[dataKey]}</span>
      ) : (
        rowData[dataKey]
      )}
    </Cell>
  );
};

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
  const [showModal, setShowModal] = useState(false);
  const [fileId, setFileId] = useState(0);
  const [diseaseName, setDiseaseName] = useState('');
  const [action, setAction] = useState('');

  const [pdfToView, setPdfToView] = useState(null);

  const [args, setArgs] = useState({});
  const userInfo = useSelector((state) => state.user.user);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleFilePreview(selectedId) {
    console.log(selectedId);
    setPdfToView(<ResultFilePDF />)
  }

  useEffect(() => {
    let userRole = decodeToken(userInfo.jwt);
    if (userRole.role === 'Employee')
      fetchData(parseInt(userInfo.info.laboratoryId));
    else
      fetchData(null);

  }, []);

  async function fetchData(laboratoryId) {
    setLoading(true);
    let data = await GetHistoryForLab(laboratoryId);
    try {
      if (data != null) {
        setHistoryFiles(data);
      }
    } catch (err) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

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

  function handleRefresh() {
    if (decodeToken(userInfo.jwt).role === 'Admin') {
      fetchData(null);
    } else
      fetchData(userInfo.info.laboratoryId);
  };

  async function filter() {
    let filteredArgs = { ...args };
    Object.keys(filteredArgs).forEach(key => {
      if (filteredArgs[key] === '' || filteredArgs[key] == null) {
        delete filteredArgs[key];
      }
    });

    const data = await historyFilterLAsync(filteredArgs);
    setHistoryFiles(data);
  }

  function handleChange(value, name) {
    if (value) {
      setArgs({
        ...args,
        [name]: value
      });
    } else {
      const newArgs = { ...args };
      delete newArgs[name];
      setArgs(newArgs);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', padding: '20px', overflow: 'hidden' }}>
      {/* Filtros */}
      <FlexboxGrid justify="start" style={{ marginBottom: 10, gap: 20 }} gutter={10}>
        {/* Primera Columna de Inputs */}
        <FlexboxGrid.Item colspan={5} style={{ marginBottom: 5 }}>
          <FormGroup controlId="code">
            <Input
              onChange={(value) => handleChange(value, 'code')}
              placeholder="Código de la ficha"
              style={{ width: '100%' }}
            />
          </FormGroup>
          <FormGroup controlId="codePatient">
            <Input
              onChange={(value) => handleChange(value, 'codePatient')}
              placeholder="Código del paciente"
              style={{ width: '100%', marginTop: 10 }}
            />
          </FormGroup>

        </FlexboxGrid.Item>

        {/* Segunda Columna de Inputs */}
        <FlexboxGrid.Item colspan={5} style={{ marginBottom: 5 }}>
          <FormGroup controlId="ci">
            <Input
              onChange={(value) => handleChange(value, 'ci')}
              placeholder="Cédula de identidad"
              style={{ width: '100%' }}
            />
          </FormGroup>
          <FormGroup controlId="names">
            <Input
              onChange={(value) => handleChange(value, 'names')}
              placeholder="Nombres"
              style={{ width: '100%', marginTop: 10 }}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Tercera Columna de Inputs */}
        <FlexboxGrid.Item colspan={5} style={{ marginBottom: 5 }}>
          <FormGroup controlId="lastName">
            <Input
              onChange={(value) => handleChange(value, 'lastName')}
              placeholder="Primer Apellido"
              style={{ width: '100%' }}
            />
          </FormGroup>
          <FormGroup controlId="secondLastName">
            <Input
              onChange={(value) => handleChange(value, 'secondLastName')}
              placeholder="Segundo Apellido"
              style={{ width: '100%', marginTop: 10 }}
            />
          </FormGroup>
        </FlexboxGrid.Item>

        {/* Botones de Buscar y Refrescar */}
        <FlexboxGrid.Item colspan={3} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Button appearance="primary" color="blue" size="md" style={{ fontSize: 16 }} onClick={() => { filter(); }}>
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
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Vista previa resultado</Tooltip>}>
                      <IconButton
                        icon={<FaRegFilePdf />}
                        appearance="ghost"
                        color="blue"
                        onClick={() => handleFilePreview(rowData.id)}
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
                            setDiseaseName(rowData.diseaseName);
                            setAction('Create');
                            handleOpenModal();
                          }}
                          style={{ color: 'black', border: 'Transparent', marginTop: 18, fontSize: '24px', padding: 5 }}
                        />
                      </Whisper>
                    ) : (
                      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar resultado</Tooltip>}>
                        <IconButton
                          icon={<FaRegEdit />}
                          appearance="ghost"
                          onClick={() => {
                            setDiseaseName(rowData.diseaseName);
                            setAction('Edit');
                            setFileId(rowData.id);
                            handleOpenModal();
                          }}
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

            <Column width={150} resizable>
              <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Código De Ficha</HeaderCell>
              <ColoredCell dataKey="code" >
                {(rowData) => <span>{rowData.code || 'N/A'}</span>}
              </ColoredCell>
            </Column>

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

            <Column width={160} resizable>
              <HeaderCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Código De Paciente</HeaderCell>
              <ColoredCell dataKey="codePatient" />
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
        <ResultViewer pdfToView={pdfToView} />

        {/* Botón para Agregar Ficha */}
        <Button appearance="primary" color="blue" size="lg" onClick={() => navigate('/fileform')}>
          <FaPlus style={{ marginRight: 10 }} /> Agregar Ficha
        </Button>

        {/* Botón para Actualizar */}
        <Button
          appearance="primary"
          color="blue"
          size="lg"
          onClick={() => handleRefresh()} >
          <FaSync style={{ marginRight: 10 }} /> Actualizar
        </Button>
      </div>

      <TestForm refreshHistoryLab={handleRefresh} open={showModal} hiddeModal={handleCloseModal} fileId={fileId} diseaseName={diseaseName} action={action} />
    </div >
  );
}

