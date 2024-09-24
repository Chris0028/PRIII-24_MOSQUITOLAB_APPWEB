import NavItem from "rsuite/esm/Nav/NavItem";

export default function CustomNavItem({ eventKey, icon, label, hoveredItem, handleMouseEnter, handleMouseLeave, disabled = false, url }) {
    return (
        <NavItem
            href={url}
            eventKey={eventKey}
            icon={icon}
            style={{
                ...styles.navItemBase,
                background: hoveredItem === eventKey ? styles.navItemActive.background : styles.navItemDefault.background,
            }}
            onMouseEnter={() => handleMouseEnter(eventKey)}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}>
            {label}
        </NavItem>
    );
}

const styles = {
    navItemBase: {
        color: 'white',
        fontSize: '18px',
        borderRadius: '6px',
        padding: '20px',
        transition: 'background-color 0.3s ease',
    },
    navItemActive: {
        background: '#00235E',
    },
    navItemDefault: {
        background: 'transparent',
    },
};
