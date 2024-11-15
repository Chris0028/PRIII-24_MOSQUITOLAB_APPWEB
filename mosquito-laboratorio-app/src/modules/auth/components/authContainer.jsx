import { Container, Content, FlexboxGrid, Footer, Header, Panel } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import sedes from '../../../../public/static/Logo_Sedes.png';
import UMA from '../../../../public/static/logo-UMA-2023_BN-positivo.png';
import UNIVALLE from '../../../../public/static/LOGO-UNIVALLE-04.png';

export default function AuthContainer({ children }) {
    return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <FlexboxGrid justify="center">
                    <FlexboxGridItem colspan={24} style={styles.logoContainer}>
                        <img src={sedes} alt="SEDES" style={styles.sedes} />
                        <h6 style={styles.headerText}>Gobierno Autónomo Departamental de Cochabamba - SDS</h6>
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={24} style={styles.titleContainer}>
                        <label style={styles.title}>Plataforma TI de Arbovirosis DE-CHI-KA</label>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Header>
            <Content style={styles.content}>
                <FlexboxGrid justify="center" align="middle">
                    <FlexboxGridItem colspan={24} style={styles.panelContainer}>
                        <Panel header="Por seguridad jamás revele sus datos" bordered style={styles.panel}>
                            {children}
                        </Panel>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Content>
            <Footer style={styles.footer}>
                <FlexboxGrid justify="space-between" align="middle">
                    <FlexboxGridItem colspan={12} style={styles.footerLeft}>
                        <img src={UNIVALLE} alt="UNIVALLE" style={styles.logoUnivalle} />
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={12} style={styles.footerRight}>
                        <img src={UMA} alt="UMA" style={styles.logoUma} />
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Footer>
        </Container>
    )
}

const styles = {
    container: {
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 20px',
        boxSizing: 'border-box',
    },
    header: {
        padding: '20px 0',
    },
    logoContainer: {
        textAlign: 'center',
    },
    sedes: {
        width: '100%',
        maxWidth: '200px',
    },
    headerText: {
        margin: 0
    },
    titleContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    title: {
        color: '#1D3B72',
        fontSize: '3vw',
        fontWeight: 500,
        textAlign: 'center',
    },
    content: {
        marginTop: '20px',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    panelContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    panel: {
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        borderColor: '#1D3B72',
        padding: '20px',
    },
    footer: {
        padding: '10px 0',
    },
    footerLeft: {
        textAlign: 'left',
    },
    footerRight: {
        textAlign: 'right',
    },
    logoUnivalle: {
        width: '80px',
        maxWidth: '100%',
    },
    logoUma: {
        width: '130px',
        maxWidth: '100%',
    },
    '@media (max-width: 768px)': {
        container: {
            padding: '10px',
        },
        title: {
            fontSize: '5vw',
        },
        panel: {
            width: '100%',
            maxWidth: '90%',
        },
        escudo: {
            width: '150px',
        },
        logoUnivalle: {
            width: '60px',
        },
        logoUma: {
            width: '100px',
        },
    },
};
