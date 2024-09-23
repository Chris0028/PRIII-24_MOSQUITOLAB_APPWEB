import { Container, Content, FlexboxGrid, Footer, Header, Panel, Stack, Text } from "rsuite";
import AuthForm from "./authForm";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";

export default function AuthContainer() {
    return (
        <Container style={{ minHeight: '100hv' }}>
            <Header>
                <FlexboxGrid>
                    <FlexboxGridItem colspan={24} style={{ textAlign: 'center' }}>
                        <img src="https://th.bing.com/th/id/R.8dc8888d3baaaf89cca27a70a7ccdc7b?rik=Dh8kxUDrEx6F2w&pid=ImgRaw&r=0" alt="Escudo patrio" style={{ width: '240px' }} />
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
                        <Panel header="Por seguridad jamás revele sus datos" bordered style={{ width: 400, height: 300, borderColor: '#1D3B72' }}>
                            <AuthForm />
                        </Panel>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}