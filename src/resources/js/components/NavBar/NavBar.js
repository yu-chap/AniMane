import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import NavBarContent from './NavBarContent';
import { grey } from '@mui/material/colors';

// Width of Navgation Bar
export const NAV_BAR_WIDTH = 300;

// Drwaerの表示制御
// メニューボタンを押すとNavigation Contentを表示し
// 再度, メニューボタンを押すとNavigation Contentを閉じる
const DrawerHandleButton = ({ onClick, sx, color }) => {
    return (
        <IconButton
            size="large"
            onClick={ onClick }
            sx={ sx }
        >
            <DensityMediumIcon sx={{ color: color }}></DensityMediumIcon>
        </IconButton>
    );
}

// Drwaerが表示された時の内容
const DrawerContent = ({ onClick }) => {
    return (
        <Box
            sx={{ width: NAV_BAR_WIDTH }}
            role="presentation"
        >
            <NavBarContent />
            <DrawerHandleButton
                onClick={ onClick }
                sx={{ position: "absolute", right: "0%", top: "0%" }}
                color={ grey[900] }
            />
        </Box>
    );
};

// Navigation Bar Component
// メニューボタンを押すとNavigation Contentを表示し
// 再度, メニューボタンを押すとNavigation Contentを閉じる
const NavBar = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setOpen(false);
    }

    return (
        <Box>
            <DrawerHandleButton
                onClick={ handleClickOpen }
                sx={{ position: "fixed", left: "0%", top: "0%" }}
                color={ grey[900] }
            />
            <Drawer
                open={ open }
                onClose={ handleClickClose }
            >
                <DrawerContent onClick={ handleClickClose } />
            </Drawer>
        </Box>
    );
}

export default NavBar;
