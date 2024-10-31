import { Container, Content, FlexboxGrid, Header, Panel } from "rsuite";
import AuthForm from "./authForm";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { CgEnter } from "react-icons/cg";
import escudo from '../../../../public/static/escudo-patrio.png'

export default function AuthContainer() {
    return (
        <Container style={{ minHeight: '100hv', padding: '100px' }}>
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
                            <AuthForm />
                        </Panel>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}
