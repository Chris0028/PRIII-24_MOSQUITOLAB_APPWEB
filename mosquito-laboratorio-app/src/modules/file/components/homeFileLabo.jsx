import { Table, Input, Button, IconButton, Tooltip, Whisper, FlexboxGrid, Loader, Pagination, Schema, Form } from 'rsuite';
import { FaEdit, FaSearch, FaSync, FaPlus, FaRegFilePdf, FaMicroscope, FaFlask, FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import { GetFileDetails } from '../services/getUpdateFile';
import { useDispatch } from 'react-redux';
import TestForm from '../../test/components/testForm';
import { useSelector } from 'react-redux';
import { decodeToken } from '../../../utils/decoder';
import FormGroup from 'rsuite/esm/FormGroup';
import ResultFilePDF from '../../pdf/sampleResult/components/sampleResultFile';
import ResultViewer from '../../pdf/sampleResult/components/resultViewer';
import { historyFilterLAsync } from '../services/historyFileFilterL';
import { GetHistoryForLab } from '../services/historyForLab';
import { regexNameReport, regexAll } from '../../../utils/validator';

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
  //pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [historyFiles, setHistoryFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalPDF, setShowModalPDF] = useState(false);
  const [fileId, setFileId] = useState(0);
  const [diseaseName, setDiseaseName] = useState('');
  const [action, setAction] = useState('');
  const [activeRole, setActiveRole] = useState('');

  const [pdfToView, setPdfToView] = useState(null);

  const [args, setArgs] = useState({});
  const userInfo = useSelector((state) => state.user.user);

  //Validation
  const [formValue, setFormValue] = useState({});
  const [formError, setFormError] = useState({});

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    code: StringType()
      .pattern(regexAll, 'El codigo de ficha solo puede contener letras - numeros'),
    codePatient: StringType()
      .pattern(regexAll, 'El codigo de paciente solo puede contener letras - numeros'),
    ci: StringType()
      .pattern(regexAll, 'El ci solo puede contener numeros y letras'),
    name: StringType()
      .pattern(regexNameReport, 'El nombre solo puede contener letras'),
    lastName: StringType()
      .pattern(regexNameReport, 'El apellido solo puede contener letras'),
    secondLastName: StringType()
      .pattern(regexNameReport, 'El apellido solo puede contener letras')
  });

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleOpenModalPDF() {
    setShowModalPDF(true);
  }

  function handleCloseModalPDF() {
    setShowModalPDF(false);
  }

  function handleFilePreview(selectedId) {
    console.log(selectedId);
    setPdfToView(<ResultFilePDF resultId={selectedId} />)
  }

  useEffect(() => {
    setActiveRole(decodeToken(userInfo.jwt).role);
    fetchData();
  }, [page, limit]);

  const fetchData = async () => {
    setLoading(true);
    let data = [];

    try {
      if (activeRole === 'Employee') {
        console.log(userInfo.info.laboratoryId)
        data = await loadFileLabo(userInfo.info.laboratoryId, page, limit);
      } else {
        data = await loadFileLabo(null, page, limit);

      }
      if (data != null) {
        setHistoryFiles(data);
        setTotal(data.total);
      }
    } catch (err) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  async function loadFileLabo(laboratoryId, page, limit) {
    const response = await GetHistoryForLab(laboratoryId, page, limit);
    setHistoryFiles(response.data);
    setTotal(response.total);
  }

  const handleEdit = async (fileId) => {
    if (fileId) {
      const data = await GetFileDetails(fileId);
      localStorage.setItem('updateFile', JSON.stringify(data));

      navigate(`/fileformu/${fileId}`);
    } else {
      console.error('File ID is undefined or null');
    }
  };

  function handleRefresh() {
    // Limpia los valores de los filtros
    setFormValue({
      code: '',
      codePatient: '',
      ci: '',
      name: '',
      lastName: '',
      secondLastName: ''
    });

    setArgs({});
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

  function handleChangeLimit(dataKey) {
    setPage(1);
    setLimit(dataKey);
  }

  const handleFormSubmit = () => {
    // Valida el formulario antes de enviar
    if (Object.keys(formError).length === 0) {
      filter(); // Realiza el filtro solo si no hay errores
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', padding: '20px', overflow: 'hidden' }}>
      <Form fluid model={model} formValue={formValue} onChange={setFormValue} onCheck={setFormError} >
        <FlexboxGrid justify="start" style={{ gap: 20 }} gutter={10}>
          <FlexboxGrid.Item colspan={5} style={{ marginBottom: 5 }}>
            <FormGroup controlId="code">
              <Form.Control
                name='code'
                onChange={(value) => handleChange(value, 'code')}
                placeholder="Código de la ficha"
                style={{ width: '100%' }}
              />
            </FormGroup>
            <FormGroup controlId="codePatient">
              <Form.Control
                name='codePatient'
                onChange={(value) => handleChange(value, 'codePatient')}
                placeholder="Código del paciente"
                style={{ marginTop: -15, width: '100%' }}
              />
            </FormGroup>

          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={5} style={{ marginBottom: 5 }}>
            <FormGroup controlId="ci">
              <Form.Control
                name='ci'
                onChange={(value) => handleChange(value, 'ci')}
                placeholder="Cédula de identidad"
                style={{ width: '100%' }}
              />
            </FormGroup>
            <FormGroup controlId="names">
              <Form.Control
                name='name'
                onChange={(value) => handleChange(value, 'names')}
                placeholder="Nombres"
                style={{ marginTop: -15, width: '100%' }}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={5} style={{ marginBottom: 5 }}>
            <FormGroup controlId="lastName">
              <Form.Control
                name='lastName'
                onChange={(value) => handleChange(value, 'lastName')}
                placeholder="Primer Apellido"
                style={{ width: '100%' }}
              />
            </FormGroup>
            <FormGroup controlId="secondLastName">
              <Form.Control
                name='secondLastName'
                onChange={(value) => handleChange(value, 'secondLastName')}
                placeholder="Segundo Apellido"
                style={{ marginTop: -15, width: '100%' }}
              />
            </FormGroup>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={3} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button appearance="primary" size="md" style={{ fontSize: 16 }} onClick={handleFormSubmit}>
              <FaSearch style={{ marginRight: 5, width: 25 }} /> Buscar
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
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
                    {/*<Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                      <IconButton
                        icon={<FaEdit />}
                        appearance="ghost"
                        style={{ color: 'black', border: 'Transparent', fontSize: '22px', padding: 5 }}
                        onClick={() => handleEdit(rowData.id)}
                      />
                    </Whisper>*/}
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Vista previa resultado</Tooltip>}>
                      <IconButton
                        icon={<FaRegFilePdf />}
                        appearance="ghost"
                        color="blue"
                        onClick={() => {
                          handleFilePreview(rowData.id);
                          handleOpenModalPDF();
                        }}
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
      <div>
        <Pagination prev next first last ellipsis boundaryLinks
          size="sm"
          maxButtons={10}
          layout={['-', 'pager']}
          total={total}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit} />
      </div>
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '10px 20px 0px 0px',
          borderTop: '2px solid #ccc',
        }}
      >
        <ResultViewer pdfToView={pdfToView} open={showModalPDF} hiddeModal={handleCloseModalPDF} />

        <Button appearance="primary" size="lg" onClick={() => navigate('/fileform')}>
          <FaPlus style={{ marginRight: 10 }} /> Agregar Ficha
        </Button>

        <Button
          appearance="primary"
          size="lg"
          onClick={() => handleRefresh()} >
          <FaSync style={{ marginRight: 10 }} /> Actualizar
        </Button>
      </div>

      <TestForm refreshHistoryLab={handleRefresh} open={showModal} hiddeModal={handleCloseModal} fileId={fileId} diseaseName={diseaseName} action={action} />
    </div >
  );
}

