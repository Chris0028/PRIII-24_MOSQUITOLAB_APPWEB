import { FaChartBar, FaCloudDownloadAlt, FaFileInvoice, FaSignOutAlt, FaUserAlt, FaVial, FaBars, FaUsers } from "react-icons/fa";
import { Container, Content, Divider, Header, Nav, Navbar, Sidebar, Sidenav, IconButton } from "rsuite";
import SidenavBody from "rsuite/esm/Sidenav/SidenavBody";
import { useEffect, useState } from "react";
import UserInfo from "./components/userInfo";
import CustomNavItem, { CustomNavMenu } from "./components/customNavItem";
import NavItem from "rsuite/esm/Nav/NavItem";
import { PiEyedropperSampleFill } from "react-icons/pi";
import { decodeToken } from "../../utils/decoder";
import { useSelector } from "react-redux";


export default function Layout({ children }) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [expanded, setExpanded] = useState(window.innerWidth > 768);

    const [role, setRole] = useState('');

    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        if (user.jwt) {
            const getUser = decodeToken(user.jwt);
            setRole(getUser.role);
        }
    }, []);

    function handleMouseEnter(eventKey) {
        setHoveredItem(eventKey);
    }

    function handleMouseLeave() {
        setHoveredItem(null);
    }

    function toggleSidebar() {
        setExpanded(!expanded);
    }

    function handleResize() {
        setExpanded(window.innerWidth > 768);
    }

    window.addEventListener('resize', handleResize);

    return (
        <Container style={styles.container}>
            <Sidebar width={expanded ? 300 : 100} collapsible expanded={expanded} style={styles.sidebar}>
                <Sidenav defaultOpenKeys={['1']} appearance="subtle">
                    <SidenavBody style={{ flexGrow: 1 }}>
                        <Nav>
                            <UserInfo expanded={expanded} />
                            <CustomNavItem eventKey="2" label="Área de trabajo" hoveredItem={hoveredItem} disabled expanded={expanded} />
                            {role !== 'Doctor' && (
                                <CustomNavItem eventKey="3" icon={<FaVial />} label="Laboratorio" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/homefilelabo'} expanded={expanded} />
                            )}
                            <CustomNavItem eventKey="5" icon={<FaFileInvoice />} label="Fichas DE.CHI.KA" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/homefiledoctor'} expanded={expanded} />
                            {role !== 'Doctor' && (
                                <CustomNavItem eventKey="4" icon={<PiEyedropperSampleFill />} label="Muestras" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/samples'} expanded={expanded} />
                            )}
                            <CustomNavItem eventKey="6" icon={<FaCloudDownloadAlt />} label="Descargas" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'#'} expanded={expanded} />
                            <CustomNavMenu
                                eventKey="7"
                                icon={<FaChartBar />}
                                label="Reportes"
                                hoveredItem={hoveredItem}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                                expanded={expanded}
                                menuItems={[
                                    { label: 'Reporte Consolidado', url: '/consolidatereport' },
                                    { label: 'Gráficos', url: '/pieGraph' }
                                ]}
                            />
                            {role === 'Admin' && (
                                <CustomNavItem eventKey="8" icon={<FaUsers />} label="Usuarios" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/users'} expanded={expanded} />
                            )}
                            <CustomNavItem eventKey="9" icon={<FaUserAlt />} label="Cuenta" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/profile'} expanded={expanded} />
                        </Nav>
                    </SidenavBody>
                    <Nav style={{ marginTop: expanded ? '10vh' : '2vh' }}>
                        <Divider />
                        <CustomNavItem eventKey="10" icon={<FaSignOutAlt />} label="Cerrar sesión" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} expanded={expanded} />
                    </Nav>
                </Sidenav>
            </Sidebar>

            <Container style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header>
                    <Navbar appearance="inverse" style={styles.navbar}>
                        <Nav>
                            <IconButton
                                icon={<FaBars />}
                                onClick={toggleSidebar}
                                appearance="subtle"
                                style={styles.toggleButton}
                                aria-label="Toggle Sidebar"
                            />
                            <NavItem disabled style={styles.headerNav}>LABORATORIO</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem disabled style={styles.headerNav}>BOLIVIA A TU SERVICIO</NavItem>
                        </Nav>
                    </Navbar>
                </Header>
                <Content style={styles.content}>
                    {children}
                </Content>
            </Container>
        </Container>
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
    }
};
