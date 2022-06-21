import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey, yellow } from '@mui/material/colors';
import { NAV_BAR_WIDTH } from './NavBar';

// ログアウトボタン
const LogOutButton = () => {
    const button_sx = {
        width: NAV_BAR_WIDTH,
        height: 60,
        bgcolor: yellow[600],
        bottom: "0%",
        position: "fixed",
        fontSize: 20,
        fontWeight: "bold",
        color: grey[900],
        borderRadius: 0,
        "&:hover": { bgcolor: yellow[800] },
    };

    return (
        <Button type="submit" sx={ button_sx }>
            ログアウト
        </Button>
    );
}

// Navigation barのfooter部分
// Navigation contentの下部分に常に配置
// ログアウトができる
const NavBarFoot = () => {
    const [csrf_token, setCsrfToken] = useState(document.head.querySelector('meta[name="csrf-token"]').content);

    return (
        <Box component="form" action='/logout' method='POST'>
            <input type="hidden" name="_token" value={ csrf_token } />
            <LogOutButton />
        </Box>
    );
}

export default NavBarFoot;