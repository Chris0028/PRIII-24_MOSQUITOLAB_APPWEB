import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IconButton, Message, Pagination, Table, Tooltip, Whisper } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";
import { getAllUsersAsync } from "../services/userService";
import { FaCircleCheck, FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import CreateUserModal from "./createUserModal";
import ChangeStatusUserModal from "./changeStatusUserModal";

export default function UserList() {

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [userId, setUserId] = useState(0);
    const [changeStatus, setChangeStatus] = useState('');
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    //pagination
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadUsers();
    }, [page, limit]);

    async function loadUsers() {
        const response = await getAllUsersAsync(page, limit);
        setUsers(response.data);
        setTotal(response.total);
    }

    function handleOpenModalChangeStatus() {
        setShowModalDelete(true);
    }

    function handleCloseModalChangeStatus() {
        setShowModalDelete(false);
    }

    function handleOpenModalCreate() {
        setShowModalCreate(true);
    }

    function handleCloseModalCreate() {
        setShowModalCreate(false);
    }

    function handleChangeLimit(dataKey) {
        setPage(1);
        setLimit(dataKey);
    }

    return (
        <>
            <IconButton onClick={() => handleOpenModalCreate()} style={{ width: 100, marginLeft: 20, fontSize: '20px' }} appearance="primary" icon={<FaCirclePlus />} />
            <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', padding: '20px', overflow: 'hidden' }}>
                <Table rowHeight={100} data={users} style={{ fontWeight: 'bold', verticalAlign: 'middle' }} height={560}>
                    {false && (
                        <Column fixed>
                            <HeaderCell>id</HeaderCell>
                            <Cell dataKey="userId"></Cell>
                        </Column>
                    )}
                    <Column width={90} fixed>
                        <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Acciones</HeaderCell>
                        <Cell style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', fontSize: 16, color: 'black' }}>
                            {(rowData) => (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                        <IconButton
                                            icon={<FaTrash />}
                                            appearance="ghost"
                                            style={{ color: 'black', border: 'Transparent', fontSize: '22px', padding: 5 }}
                                            onClick={() => {
                                                setUserId(rowData.userId)
                                                setUsername(rowData.userName);
                                                setChangeStatus('DE');
                                                handleOpenModalChangeStatus();
                                            }}
                                        />
                                    </Whisper>
                                    {rowData.status === 1 ? (
                                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Deshabilitar</Tooltip>}>
                                            <IconButton
                                                icon={<FaCircleMinus />}
                                                appearance="ghost"
                                                onClick={() => {
                                                    setUserId(rowData.userId)
                                                    setUsername(rowData.userName);
                                                    setChangeStatus('DI');
                                                    handleOpenModalChangeStatus();
                                                }}
                                                style={{ color: 'black', border: 'Transparent', fontSize: '23px', padding: 5 }}
                                            />
                                        </Whisper>
                                    ) : (
                                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Habilitar</Tooltip>}>
                                            <IconButton
                                                icon={<FaCircleCheck />}
                                                appearance="ghost"
                                                onClick={() => {
                                                    setUserId(rowData.userId)
                                                    setUsername(rowData.userName);
                                                    setChangeStatus('EN');
                                                    handleOpenModalChangeStatus();
                                                }}
                                                style={{ color: 'black', border: 'Transparent', fontSize: '23px', padding: 5 }}
                                            />
                                        </Whisper>
                                    )}
                                </div>
                            )}
                        </Cell>
                    </Column>
                    <Column width={150}>
                        <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Estado</HeaderCell>
                        <Cell dataKey="status" style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', textAlign: 'center', verticalAlign: 'middle', fontSize: 16, color: 'black' }}>
                            {(rowData) => (
                                <>
                                    {rowData.status === 1 ? (
                                        <Message showIcon type="success">Activo</Message>
                                    ) : (
                                        <Message showIcon type="error">Inactivo</Message>
                                    )}
                                </>
                            )}
                        </Cell>
                    </Column>
                    <Column resizable>
                        <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Usuario</HeaderCell>
                        <Cell dataKey="userName" style={{ display: 'flex', alignItems: 'center', height: '100%', textAlign: 'center', verticalAlign: 'middle', fontSize: 16, color: 'black' }}></Cell>
                    </Column>
                    <Column width={120} resizable>
                        <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Cargo</HeaderCell>
                        <Cell dataKey="role" style={{ display: 'flex', alignItems: 'center', height: '100%', textAlign: 'center', verticalAlign: 'middle', fontSize: 16, color: 'black' }}>
                            {(rowData) => {
                                if (rowData.role === 'Admin') {
                                    return <span>Administrador</span>
                                } else if (rowData.role === 'Employee') {
                                    return <span>Laboratorio</span>
                                } else {
                                    return <span>Médico</span>
                                }
                            }}
                        </Cell>
                    </Column>
                    <Column width={250} resizable>
                        <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Nombre Completo</HeaderCell>
                        <Cell dataKey="fullName" style={{ display: 'flex', alignItems: 'center', height: '100%', textAlign: 'center', verticalAlign: 'middle', fontSize: 16, color: 'black' }}></Cell>
                    </Column>
                    <Column width={150} resizable>
                        <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>N° de contacto</HeaderCell>
                        <Cell dataKey="phone" style={{ display: 'flex', alignItems: 'center', height: '100%', textAlign: 'center', verticalAlign: 'middle', fontSize: 16, color: 'black' }}></Cell>
                    </Column>
                    <Column width={180} resizable>
                        <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Correo electrónico</HeaderCell>
                        <Cell dataKey="email" style={{ display: 'flex', alignItems: 'center', height: '100%', textAlign: 'center', verticalAlign: 'middle', fontSize: 16, color: 'black' }}></Cell>
                    </Column>
                    <Column width={250} resizable>
                        <HeaderCell style={{ fontWeight: 'bolder', fontSize: 17 }}>Lugar de trabajo</HeaderCell>
                        <Cell dataKey="workPlace" style={{ display: 'flex', alignItems: 'center', height: '100%', textAlign: 'center', verticalAlign: 'middle', fontSize: 16, color: 'black' }}></Cell>
                    </Column>
                </Table>
            </div>
            <div>
                <Pagination prev next first last ellipsis boundaryLinks
                    size="sm"
                    maxButtons={5}
                    layout={['-', 'pager']}
                    total={total}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit} />
            </div>

            <ChangeStatusUserModal toChangeStatus={changeStatus} refreshUsers={loadUsers} open={showModalDelete} hiddeModal={handleCloseModalChangeStatus} userId={userId} username={username} />
            <CreateUserModal refreshUsers={loadUsers} open={showModalCreate} hiddeModal={handleCloseModalCreate} />
        </>
    );
}