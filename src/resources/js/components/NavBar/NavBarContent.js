import React from 'react';
import Box from '@mui/material/Box';
import NavBarHead from './Header';
import NavBarFoot from './Footer';
import NavBarBody from './NavBarBody/NavBarBody';

const NavBarContent = ({ NavBarWidth }) => {
    return (
        <Box>
            <NavBarHead NavBarWidth={ NavBarWidth } />
            <NavBarBody NavBarWidth={ NavBarWidth } />
            <NavBarFoot NavBarWidth={ NavBarWidth }/>
        </Box>
    );
}

export default NavBarContent;