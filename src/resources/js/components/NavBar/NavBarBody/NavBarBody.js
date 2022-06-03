import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { yellow } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddFolder from './AddFolder';
import ViewFolderList from './ViewFolderList';
import ClearButton from '../../common/ClearButton';

// フォルダ検索バー //
const FolderSearchBar = ({ NavBarWidth, handleReRender, handleChange, handleRefresh, handleReload, value }) => {
    const SearBarWidth = NavBarWidth - 50;
    return (
        <Box sx={{ width: NavBarWidth, height: 60, justifyContent: "center", alignItems: "start", display: "flex", bgcolor: yellow[600], top: 120, left: "0%", position: "fixed" }}>
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: SearBarWidth }}>
                <Tooltip title="フォルダの検索" placement="bottom"><IconButton onClick={ handleReRender }><SearchIcon fontSize="small" /></IconButton></Tooltip>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="フォルダの検索"
                    value={ value }
                    onChange={ handleChange }
                />
                { (value === "") ? null : <ClearButton title="検索のクリア" handleRefresh={ handleRefresh } /> }
                <Tooltip title="フォルダの再読み込み" placement="bottom"><IconButton onClick={ handleReload }><RefreshIcon fontSize="small" /></IconButton></Tooltip>
            </Paper>
        </Box>
    );
}

// Navgation BarのBody部分 //
// - フォルダ一覧表示機能
// - フォルダの追加機能
// - フォルダの検索機能 を実装
const NavBarBody = ({ NavBarWidth }) => {
    const tmp_items = new Array(100);
    for(let i = 0; i < 100; i++) {
        tmp_items[i] = {
            "name": "FolderFolderFolder" + String(i+1),
            "key": i+1,
        }
    }

    const [items, setItems] = useState([]);
    const [value, setValue] = useState("");
    const [reRender, setReRender] = useState(0);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleReRender = () => {
        setReRender((prevreRender) => {
            return (prevreRender + 1) % 2;
        });
    }

    const handleRefresh = () => {
        setValue("");
    }

    const handleReload = () => {
        handleRefresh();
        handleReRender();
        console.log("Refreshed folders");
    }

    useEffect(() => {
        if(value === "") { setItems(tmp_items); }
        else { console.log(`Search ${value}`); setItems([{"name": value, "key": 1}]); }
    }, [reRender])

    return (
        <Box>
            {/* フォルダ検索部分 */}
            <FolderSearchBar
                NavBarWidth={ NavBarWidth }
                handleReRender={ handleReRender }
                handleChange={ handleChange }
                handleRefresh={ handleRefresh }
                handleReload={ handleReload }
                value={ value }
            />

            {/* フォルダ追加部分 */}
            <AddFolder NavBarWidth={ NavBarWidth } handleReload={ handleReload } />

            {/* フォルダ一覧部分 */}
            <ViewFolderList items={ items } NavBarWidth={ NavBarWidth } handleReload={ handleReload } />
        </Box>
    );
}

export default NavBarBody;