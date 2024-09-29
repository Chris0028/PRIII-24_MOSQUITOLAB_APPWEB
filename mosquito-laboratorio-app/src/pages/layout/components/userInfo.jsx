import { Avatar } from "rsuite";
import NavItem from "rsuite/esm/Nav/NavItem";

export default function UserInfo({ expanded }) {
    return (
        <NavItem eventKey="1" style={{ ...styles.userInfo, justifyContent: expanded ? 'flex-start' : 'center' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: expanded ? 'row' : 'column',
                justifyContent: expanded ? 'flex-start' : 'center',
                width: '100%',
            }}>
                <Avatar circle size={expanded ? "lg" : "md"} />
                {expanded && (
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                        <span>NOMBRE DE USUARIO</span>
                        <span style={{ fontSize: 'smaller', opacity: 0.8 }}>Rol</span>
                    </div>
                )}
            </div>
        </NavItem>
    );
}

const styles = {
    userInfo: {
        color: 'white',
        background: '#00235E',
        padding: '15px',
        transition: 'all 0.3s ease',
        display: 'flex',
    }
};
