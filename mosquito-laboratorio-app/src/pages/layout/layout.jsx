import { Container, Content, Header, Nav, Navbar, Sidebar, Sidenav, IconButton, Footer, Button, Whisper, Tooltip } from "rsuite";
import { FaChartBar, FaCloudDownloadAlt, FaFileInvoice, FaSignOutAlt, FaUserAlt, FaVial, FaBars, FaUsers, FaFileAlt, FaChartPie, FaChartLine } from "react-icons/fa";
import SidenavBody from "rsuite/esm/Sidenav/SidenavBody";
import { useEffect, useState } from "react";
import UserInfo from "./components/userInfo";
import CustomNavItem from "./components/customNavItem";
import NavItem from "rsuite/esm/Nav/NavItem";
import { PiEyedropperSampleFill } from "react-icons/pi";
import { decodeToken } from "../../utils/decoder";
import { useDispatch, useSelector } from "react-redux";
import connectToSignalR from "./services/signalRService";
import NotificationContainer from "./components/notificationContainer";
import DevsModal from "./components/devsModal";
import SidenavToggle from "rsuite/esm/Sidenav/SidenavToggle";
import { useNavigate } from "react-router-dom";
import { clearUser } from '../../redux/userSlice';

export default function Layout({ titleComponent, children }) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [expanded, setExpanded] = useState(window.innerWidth > 768);

    const [role, setRole] = useState('');

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [showDevsModal, setShowDevsModal] = useState(false);

    function signOut() {
        dispatch(clearUser());
        localStorage.clear();
    }

    useEffect(() => {
        if (user.jwt) {
            const getUser = decodeToken(user.jwt);
            setRole(getUser.role);
        }
    }, []);

    useEffect(() => {
        if (user.info.laboratoryId) {
            const connection = connectToSignalR(user.info.laboratoryId, (msg) => {
                setMessage(msg);
            });

            return () => connection.stop();
        }
    }, [user.info.laboratoryId]);

    function handleMouseEnter(eventKey) {
        setHoveredItem(eventKey);
    }

    function handleMouseLeave() {
        setHoveredItem(null);
    }

    function handleOpenDevsModal() {
        setShowDevsModal(true);
    }

    function handleCloseDevsModal() {
        setShowDevsModal(false);
    }
    const [openKeys, setOpenKeys] = useState(['7']);
    return (
        <>
            <Container style={styles.container}>
                <Sidebar width={expanded ? 300 : 100} collapsible style={styles.sidebar}>
                    <Sidenav
                        style={styles.sidenav}
                        expanded={expanded}
                        onOpenChange={setOpenKeys}
                        openKeys={openKeys}
                        defaultOpenKeys={['7']}
                        appearance="inverse">
                        <SidenavBody style={{ flexGrow: 1 }}>
                            <Nav>
                                <UserInfo expanded={expanded} />
                                <CustomNavItem eventKey="2" label="Área de trabajo" hoveredItem={hoveredItem} disabled expanded={expanded} />
                                {role !== 'Doctor' && (
                                    <CustomNavItem eventKey="3" icon={<FaVial />} label="Laboratorio" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/homefilelabo'} expanded={expanded} />
                                )}
                                <CustomNavItem eventKey="5" icon={<FaFileInvoice />} label="Fichas DE.CHI.KA" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/homefiledoctor'} expanded={expanded} />
                                {role !== 'Doctor' && (
                                    <>
                                        <CustomNavItem eventKey="4" icon={<PiEyedropperSampleFill />} label="Muestras" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/samples'} expanded={expanded} />
                                        <CustomNavItem eventKey="6" icon={<FaCloudDownloadAlt />} label="Descargas" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/download'} expanded={expanded} />
                                        <Nav.Menu
                                            title={
                                                expanded ? (
                                                    <span style={{ marginLeft: 10, fontSize: 18 }}>
                                                        Reportes
                                                    </span>
                                                ) : (
                                                    <span style={{ fontSize: 18 }}>
                                                        <FaChartBar /> Reportes
                                                    </span>
                                                )
                                            }
                                            style={{
                                                ...styles.navMenu,
                                                background: hoveredItem === '7' ? '#00235E' : 'transparent',
                                                display: 'flex',
                                                justifyContent: expanded ? 'center' : 'flex-start',
                                            }}
                                            eventKey={'7'}
                                            icon={<span>{<FaChartBar />}</span>}
                                            onMouseEnter={() => handleMouseEnter('7')}
                                            onMouseLeave={handleMouseLeave}>
                                            <Nav.Item
                                                onMouseEnter={() => handleMouseEnter('7-1')}
                                                onMouseLeave={handleMouseLeave}
                                                style={{
                                                    ...styles.navItemBaseMenuOption,
                                                    color: expanded || hoveredItem === '7-1' ? 'white' : 'black',
                                                    background: hoveredItem === '7-1' ? '#00235E' : 'transparent'
                                                }}
                                                eventKey={'7-1'}
                                                icon={<FaFileAlt />}
                                                onClick={() => navigate('/consolidatereport')}>
                                                Reporte Consolidado
                                            </Nav.Item>
                                            <Nav.Item
                                                onMouseEnter={() => handleMouseEnter('7-2')}
                                                onMouseLeave={handleMouseLeave}
                                                style={{
                                                    ...styles.navItemBaseMenuOption,
                                                    color: expanded || hoveredItem === '7-2' ? 'white' : 'black',
                                                    background: hoveredItem === '7-2' ? '#00235E' : 'transparent'
                                                }}
                                                eventKey={'7-2'}
                                                icon={<FaChartPie />}
                                                onClick={() => navigate('/pieGraph')}>
                                                Gráficos
                                            </Nav.Item>
                                        </Nav.Menu>
                                    </>
                                )}
                                {role === 'Admin' && (
                                    <CustomNavItem eventKey="8" icon={<FaUsers />} label="Usuarios" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/users'} expanded={expanded} />
                                )}
                                <CustomNavItem eventKey="9" icon={<FaUserAlt />} label="Cuenta" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/profile'} expanded={expanded} />
                            </Nav>
                        </SidenavBody>
                        <SidenavToggle onToggle={setExpanded} style={{ background: '#203E7B' }} />
                    </Sidenav>
                </Sidebar>

                <Container style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header>
                        <Navbar appearance="inverse" style={styles.navbar}>
                            <Nav>
                                <NavItem disabled style={styles.headerNav}>{titleComponent}</NavItem>
                            </Nav>
                            <Nav pullRight>
                                <NavItem disabled style={styles.headerNav}>BOLIVIA A TU SERVICIO</NavItem>
                                <Whisper trigger={'hover'} placement="left" speaker={<Tooltip>Cerrar sesión</Tooltip>}>
                                    <IconButton
                                        icon={<FaSignOutAlt />}
                                        onClick={() => signOut()}
                                        appearance="ghost"
                                        style={styles.toggleButton}
                                        aria-label="Toggle Sidebar"
                                    />
                                </Whisper>
                            </Nav>
                        </Navbar>
                    </Header>
                    <Content style={styles.content}>
                        <NotificationContainer message={message} />
                        {children}
                    </Content>
                    <Footer style={styles.footer}>
                        <Button
                            appearance="subtle"
                            onClick={() => handleOpenDevsModal()}>Desarrollado por Univalle®</Button>
                    </Footer>
                </Container>
            </Container>

            <DevsModal open={showDevsModal} hiddeModal={handleCloseDevsModal} />
        </>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        background: '#203E7B',
    },
    sidenav: {
        width: '100%'
    },
    navbar: {
        background: '#F5F5F5',
        color: 'black',
        padding: '15px',
    },
    toggleButton: {
        marginRight: '10px',
    },
    headerNav: {
        fontWeight: 'bolder',
        fontSize: '16px',
    },
    content: {
        padding: '20px',
        overflow: 'auto',
    },
    footer: {
        padding: '5px',
        textAlign: 'center'
    },
    navItemBaseMenuOption: {
        fontSize: '15px',
        borderRadius: '6px',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
    },
    navMenu: {
        padding: '10px',
        borderRadius: '6px',
    }
};
