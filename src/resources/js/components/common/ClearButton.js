import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

// 入力のクリアボタン
// ボタンを押すと入力内容がクリアされる
const ClearButton = ({ title, handleRefresh, fontSize }) => {
    return (
        <Box>
            <Tooltip title={ title } placeholder="bottom">
                <IconButton onClick={ handleRefresh }>
                    <ClearIcon fontSize={ fontSize } />
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default ClearButton;