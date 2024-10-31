import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavItem from "rsuite/esm/Nav/NavItem";
import { Nav } from 'rsuite';

export default function CustomNavItem({ eventKey, icon, label, hoveredItem, handleMouseEnter, handleMouseLeave, disabled = false, url, expanded }) {
    const adjustedIcon = icon ? React.cloneElement(icon, { size: expanded ? '1em' : '1.5em' }) : null;

    const navigate = useNavigate();

    function handleClick() {
        if (!disabled) {
            navigate(url);
        }
    }
    return (
        <NavItem
            onClick={handleClick}
            eventKey={eventKey}
            icon={adjustedIcon}
            style={{
                ...styles.navItemBase,
                background: hoveredItem === eventKey ? styles.navItemActive.background : styles.navItemDefault.background,
                justifyContent: expanded ? 'flex-start' : 'center',
                padding: expanded ? '20px' : '25px',
            }}
            onMouseEnter={() => handleMouseEnter(eventKey)}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}>
            {expanded && label}
        </NavItem>
    );
}

export function CustomNavMenu({ eventKey, icon, label, hoveredItem, handleMouseEnter, handleMouseLeave, expanded, menuItems }) {
    const navigate = useNavigate();
    const adjustedIcon = icon ? React.cloneElement(icon, { size: expanded ? '1em' : '1.5em', style: { marginRight: expanded ? '10px' : '0' } }) : null;

    return (
        <Nav.Menu
            title={
                <span style={{ display: 'flex', alignItems: 'center', color: 'white', marginLeft: -70, paddingLeft: expanded ? '15px' : '0' }}>
                    {adjustedIcon}
                    {expanded && <span style={{ marginLeft: '5px' }}>{label}</span>}
                </span>
            }
            style={{
                ...styles.navMenuBase,
                background: hoveredItem === eventKey ? styles.navItemActive.background : styles.navItemDefault.background,
                justifyContent: expanded ? 'flex-start' : 'center',
                padding: expanded ? '20px' : '25px',
                color: 'white',
            }}
            onMouseEnter={() => handleMouseEnter(eventKey)}
            onMouseLeave={handleMouseLeave}
            eventKey={eventKey}
        >
            {menuItems.map((item, index) => (
                <Nav.Item
                    key={index}
                    onClick={() => navigate(item.url)}
                    style={{
                        color: 'white',
                        paddingLeft: expanded ? '30px' : '20px',
                        paddingRight: '20px',
                        backgroundColor: hoveredItem === `${eventKey}-${index}` ? '#00235E' : 'transparent',
                    }}
                >
                    {item.label}
                </Nav.Item>
            ))}
        </Nav.Menu>
    );
}

const styles = {
    navItemBase: {
        color: 'white',
        fontSize: '18px',
        borderRadius: '6px',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
    },
    navItemActive: {
        background: '#00235E',
    },
    navItemDefault: {
        background: 'transparent',
    },
};
