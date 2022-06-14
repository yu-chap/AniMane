import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { yellow } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ClearButton from '../../../common/ClearButton';
import { NAV_BAR_WIDTH } from '../../NavBar';


// フォルダ検索バー
const FolderSearchBar = ({ handleChange, handleRefresh, handleReload, value }) => {
    const SearchBarWidth = NAV_BAR_WIDTH - 50;
    const box_sx = {
        width: NAV_BAR_WIDTH,
        height: 60,
        justifyContent: "center",
        alignItems: "start",
        display: "flex",
        bgcolor: yellow[600],
        top: 120,
        left: "0%",
        position: "fixed",
    };

    const paper_sx = {
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: SearchBarWidth,
    };

    return (
        <Box sx={ box_sx }>
            <Paper sx={ paper_sx }>
                <IconButton disabled>
                    <SearchIcon fontSize="small" />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="フォルダの検索"
                    value={ value }
                    onChange={ handleChange }
                />
                { (value === "") ? null : <ClearButton title="検索のクリア" handleRefresh={ handleRefresh } fontSize="small"/> }
                <Tooltip title="フォルダの再読み込み" placement="bottom">
                    <IconButton onClick={ handleReload }>
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Paper>
        </Box>
    );
}

export default FolderSearchBar;