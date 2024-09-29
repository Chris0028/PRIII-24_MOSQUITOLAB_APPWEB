import React from 'react';
import NavItem from "rsuite/esm/Nav/NavItem";

export default function CustomNavItem({ eventKey, icon, label, hoveredItem, handleMouseEnter, handleMouseLeave, disabled = false, url, expanded }) {
    const adjustedIcon = icon ? React.cloneElement(icon, { size: expanded ? '1em' : '1.5em' }) : null;

    return (
        <NavItem
            href={url}
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
