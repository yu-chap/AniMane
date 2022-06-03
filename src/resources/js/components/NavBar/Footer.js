import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { grey, yellow } from '@mui/material/colors';


// ログアウトボタン //
const LogOutButton = ({ NavBarWidth }) => {
    const handleClick = () => {
        console.log("Logout");
    }
    return (
        <Button
            component={ Typography }
            onClick={ handleClick }
            sx={{ width: NavBarWidth, height: 60, bgcolor: yellow[600], bottom: "0%", position: "fixed", fontSize: 20, color: grey[900] }}
        >
            ログアウト
        </Button>
    );
}

// Navigation barのfooter部分 //
// Navigation contentの下部分に常に配置
// ログアウトができる
const NavBarFoot = ({ NavBarWidth }) => {
    const [csrf_token, setCsrfToken] = useState(document.head.querySelector('meta[name="csrf-token"]').content);
    return (
        <Box>
            <input type="hidden" name="_token" value={ csrf_token } />
            <LogOutButton NavBarWidth={ NavBarWidth } />
        </Box>
    );
}

export default NavBarFoot;