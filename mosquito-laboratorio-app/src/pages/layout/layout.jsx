import { FaChartBar, FaCloudDownloadAlt, FaFileInvoice, FaSignOutAlt, FaUserAlt, FaVial } from "react-icons/fa";
import { Container, Content, Divider, Header, Nav, Navbar, Sidebar, Sidenav } from "rsuite";
import SidenavBody from "rsuite/esm/Sidenav/SidenavBody";
import { useState } from "react";
import UserInfo from "./components/userInfo";
import CustomNavItem from "./components/customNavItem";
import NavItem from "rsuite/esm/Nav/NavItem";

export default function Layout({children}) {
    const [hoveredItem, setHoveredItem] = useState(null);

    function handleMouseEnter(eventKey) {
        setHoveredItem(eventKey);
    }

    function handleMouseLeave() {
        setHoveredItem(null);
    }

    return (
        <Container style={styles.container}>
            <Sidebar width={300} collapsible style={styles.sidebar}>
                <Sidenav defaultOpenKeys={['1']} appearance="subtle">
                    <SidenavBody style={{ flexGrow: 1 }}>
                        <Nav>
                            <UserInfo />
                            <CustomNavItem eventKey="2" label="Área de trabajo" hoveredItem={hoveredItem} disabled />
                            <CustomNavItem eventKey="3" icon={<FaVial />} label="Laboratorio" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/fileform'} />
                            <CustomNavItem eventKey="4" icon={<FaFileInvoice />} label="Fichas DE.CHI.KA" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/homefiledoctor'} />
                            <CustomNavItem eventKey="5" icon={<FaCloudDownloadAlt />} label="Descargas" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'/homefilelabo'} />
                            <CustomNavItem eventKey="6" icon={<FaChartBar />} label="Reportes" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'#'} />
                            <CustomNavItem eventKey="7" icon={<FaUserAlt />} label="Cuenta" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} url={'#'} />
                        </Nav>
                    </SidenavBody>
                    <Nav style={{ marginTop: '25vh' }}>
                        <Divider />
                        <CustomNavItem eventKey="8" icon={<FaSignOutAlt />} label="Cerrar sesión" hoveredItem={hoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
                    </Nav>
                </Sidenav>
            </Sidebar>

            <Container style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header>
                    <Navbar appearance="inverse" style={styles.navbar}>
                        <Nav>
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
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        background: '#203E7B',
    },
    navbar: {
        background: '#F5F5F5',
        color: 'black',
        padding: '25px',
    },
    headerNav: {
        fontWeight: 'bolder',
        fontSize: '18px',
    },
    content: {
        padding: '20px',
        overflow: 'auto',
    }
};
