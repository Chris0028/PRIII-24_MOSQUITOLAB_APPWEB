import { Container, Content, FlexboxGrid, Footer, Header, Panel } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import escudo from '../../../../public/static/escudo-patrio.png'
import UMA from '../../../../public/static/logo-UMA-2023_BN-positivo.png'
import UNIVALLE from '../../../../public/static/LOGO-UNIVALLE-04.png'

export default function AuthContainer({ children }) {
    return (
        <Container style={{ minHeight: '100hv', paddingTop: '75px', paddingRight: '50px', paddingLeft: '50px', paddingBottom: '50px' }}>
            <Header>
                <FlexboxGrid>
                    <FlexboxGridItem colspan={24} style={{ textAlign: 'center' }}>
                        <img src={escudo} alt="Escudo patrio" style={{ width: '240px' }} />
                        <h6 style={{ fontFamily: 'serif' }}>MINISTERIO DE SALUD Y DEPORTES</h6>
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={24} style={{ textAlign: 'center', marginTop: '40px' }}>
                        <label style={{ color: '#1D3B72', fontSize: '35px', fontWeight: 500 }}>Sistema Integrado de Vigilancia Epidemiológica</label>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Header>
            <Content style={{ marginTop: '60px' }}>
                <FlexboxGrid justify="center" align="middle">
                    <FlexboxGridItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Panel header="Por seguridad jamás revele sus datos" bordered style={{ textAlign: 'center', width: 400, height: 300, borderColor: '#1D3B72' }}>
                            {children}
                        </Panel>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Content>
            <Footer style={{ marginTop: '10px' }}>
                <FlexboxGrid justify="space-between" align="middle">
                    <FlexboxGridItem colspan={12} style={{ textAlign: 'left' }}>
                        <img src={UNIVALLE} alt="UNIVALLE" style={{ width: '80px' }} />
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={12} style={{ textAlign: 'right' }}>
                        <img src={UMA} alt="UMA" style={{ width: '130px' }} />
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Footer>
        </Container>
    )
}
