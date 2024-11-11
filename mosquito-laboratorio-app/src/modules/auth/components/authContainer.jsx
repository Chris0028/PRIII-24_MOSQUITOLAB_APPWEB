import { Container, Content, FlexboxGrid, Header, Panel } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import escudo from '../../../../public/static/escudo-patrio.png'
import uma from '../../../../public/static/logo-UMA-2023_BN-positivo.png'

export default function AuthContainer({ children }) {
    return (
        <Container style={{ minHeight: '100hv', padding: '100px' }}>
            <Header>
                <FlexboxGrid>
                    <FlexboxGridItem colspan={24} style={{ textAlign: 'center' }}>
                        <img src={uma} alt="Escudo patrio" style={{ width: '240px' }} />
                        <h6 style={{ fontFamily: 'serif' }}>DESARROLLADO POR UNIVALLE</h6>
                    </FlexboxGridItem>
                    <FlexboxGridItem colspan={24} style={{ textAlign: 'center', marginTop: '40px' }}>
                        <label style={{ color: '#1D3B72', fontSize: '35px', fontWeight: 500 }}>Sistema Integrado de Vigilancia Epidemiológica</label>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Header>
            <Content style={{ marginTop: '60px' }}>
                <FlexboxGrid justify="center" align="middle">
                    <FlexboxGridItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Panel header="Por seguridad jamás revele sus datos" bordered style={{ textAlign: 'center', width: 400, height: 350, borderColor: '#1D3B72' }}>
                            {children}
                        </Panel>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}
