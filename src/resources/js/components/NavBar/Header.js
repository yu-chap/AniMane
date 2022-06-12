import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { grey, yellow } from '@mui/material/colors';
import { NAV_BAR_WIDTH } from './NavBar';

// Navigation barのHeader部分 //
// プロダクト名を表示
const NavBarHead = () => {
    return (
        <Box sx={{ width: NAV_BAR_WIDTH, height: 120, bgcolor: yellow[600], position: "fixed", top: "0%", left: "0%", justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Typography
                component={ Link }
                to="/app/home"
                sx={{ fontWeight: "bold", fontSize: 30, color: grey[900], textDecoration: "none", "&:hover": { color: grey[900] } }}
            >
                AniMane
            </Typography>
        </Box>
    );
}

export default NavBarHead;