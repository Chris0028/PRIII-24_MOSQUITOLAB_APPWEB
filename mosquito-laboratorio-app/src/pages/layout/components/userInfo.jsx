import { Avatar } from "rsuite";
import NavItem from "rsuite/esm/Nav/NavItem";

export default function UserInfo() {
    return (
        <NavItem eventKey="1" style={styles.userInfo}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar circle size="lg" />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                    <span>NOMBRE DE USUARIO</span>
                    <span style={{ fontSize: 'smaller', opacity: 0.8 }}>Rol</span>
                </div>
            </div>
        </NavItem>
    );
}

const styles = {
    userInfo: {
        color: 'white',
        background: '#00235E',
        padding: '25px',
    }
};