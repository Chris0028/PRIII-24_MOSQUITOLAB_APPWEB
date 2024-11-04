import { useEffect, useState } from "react";
import { Avatar } from "rsuite";
import NavItem from "rsuite/esm/Nav/NavItem";
import { decodeToken } from "../utils/decoder";
import { useSelector } from "react-redux";

export default function UserInfo({ expanded }) {

    const [userAuth, setUserAuth] = useState({ username: '', role: '' });
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (user.jwt) {
            const getUser = decodeToken(user.jwt);
            if (getUser.role === 'Admin') {
                setUserAuth({ username: getUser.sub, role: 'Administrador' });
            } else if (getUser.role === 'Employee') {
                setUserAuth({ username: getUser.sub, role: 'Laboratorio' });
            } else {
                setUserAuth({ username: getUser.sub, role: 'Médico' });
            }
        }
    }, []);

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
                        <span>{userAuth.username}</span>
                        <span style={{ fontSize: 'smaller', opacity: 0.8 }}>{userAuth.role}</span>
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
