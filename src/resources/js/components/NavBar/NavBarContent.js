import React from 'react';
import Box from '@mui/material/Box';
import NavBarHead from './Header';
import NavBarFoot from './Footer';
import NavBarBody from './NavBarBody/NavBarBody';

const NavBarContent = () => {
    return (
        <Box>
            <NavBarHead />
            <NavBarBody />
            <NavBarFoot />
        </Box>
    );
}

export default NavBarContent;