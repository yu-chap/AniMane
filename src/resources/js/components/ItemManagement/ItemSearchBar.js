import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ClearButton from '../common/ClearButton';

// SearchBarWidthを決定する関数 //
// minWidthを280, maxWidthを1100とし
// それ以外はBoxWidth-100とする
const getSearchBarWidth = (BoxWidth) => {
    const SearchBarWidth = BoxWidth - 100;
    if(SearchBarWidth > 1100) {
        return 1100;
    }
    else if(SearchBarWidth < 280) {
        return 280;
    }
    else {
        return SearchBarWidth;
    }
}

// フォルダ内アイテム検索バー //
const ItemSearchBar = ({ BoxWidth, handleChange, handleRefresh, handleReload, value }) => {
    const SearchBarWidth = getSearchBarWidth(BoxWidth);
    return (
        <Box sx={{ position: "fixed", display: "flex", justifyContent: "center", height: 100, width: BoxWidth }}>
            <Paper elevation={ 24 } sx={{ margin: "20px auto", display: "flex", alignItems: "center", width: SearchBarWidth }}>
                <IconButton disabled>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="フォルダ内検索"
                    value={ value }
                    onChange={ handleChange }
                />
                { (value === "") ? null : <ClearButton title="検索のクリア" handleRefresh={ handleRefresh } /> }
                <Tooltip title="アニメの再読み込み" placement="bottom"><IconButton onClick={ handleReload }><RefreshIcon /></IconButton></Tooltip>
            </Paper>
        </Box>
    );
}

export default ItemSearchBar;