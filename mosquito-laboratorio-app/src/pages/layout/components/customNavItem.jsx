import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'rsuite';
import NavItem from "rsuite/esm/Nav/NavItem";

export default function CustomNavItem({ eventKey, icon, label, hoveredItem, handleMouseEnter, handleMouseLeave, disabled = false, url, expanded }) {
    const adjustedIcon = icon ? React.cloneElement(icon, { size: expanded ? '1em' : '1.5em' }) : null;

    const dispatch = useDispatch();

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
                padding: expanded ? '20px' : '20px',
            }}
            onMouseEnter={() => handleMouseEnter(eventKey)}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}>
            {expanded && label}
        </NavItem>
    );
};

export function CustomNavMenu({ eventKey, icon, label, hoveredItem, handleMouseEnter, handleMouseLeave, expanded, menuItems }) {
    const navigate = useNavigate();
    const adjustedIcon = icon ? React.cloneElement(icon, { size: expanded ? '1em' : '1.5em' }) : null;

    return (
        <Nav.Menu
            title={
                <span style={{ display: 'flex', alignItems: 'center', color: 'white', marginLeft: -50, paddingLeft: expanded ? '15px' : '0', fontSize: '18px' }}>
                    {adjustedIcon}
                    {expanded && <span style={{ marginLeft: '5px' }}>{label}</span>}
                </span>
            }
            style={{
                ...styles.navMenuItemBase,
                padding: expanded ? '0px' : '0px',
                color: 'white',
            }}
            onMouseEnter={() => handleMouseEnter(eventKey)}
            onMouseLeave={handleMouseLeave}
            eventKey={eventKey}
        >
            {menuItems.map((item, index) => (
                <Nav.Item
                    key={index}
                    eventKey={`7-${index}`}
                    onClick={() => navigate(item.url)}
                    style={{
                        color: 'white',
                        backgroundColor: hoveredItem === `${eventKey}-${index}` ? '#00235E' : 'transparent',
                        width: '100%'
                    }}
                    onMouseEnter={() => handleMouseEnter(`7-${index}`)}>
                    {item.label}
                </Nav.Item>
            ))}
        </Nav.Menu>
    );
};


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
    navMenuItemBase: {
        color: 'white',
        fontSize: '18px',
        borderRadius: '6px',
        transition: 'all 0.3s ease',
        display: 'flex',
        padding: '30px'
    },
};
