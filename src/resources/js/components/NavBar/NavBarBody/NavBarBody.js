import React, { useState, useEffect, useRef, useContext } from 'react';
import Box from '@mui/material/Box';
import AddFolder from './tool/AddFolder';
import ViewFolderList from './ViewFolderList/ViewFolderList';
import FolderSearchBar from './tool/FolderSearchBar';
import { FolderStatusManagementContext } from '../../FolderStatusManagement/FolderStatusManagement';

// Navgation BarのBody部分
// - フォルダ一覧表示機能
// - フォルダの追加機能
// - フォルダの検索機能 を実装
const NavBarBody = () => {
    const [folders, setFolders] = useState([]);
    const [value, setValue] = useState("");
    const [state, dispatch] = useContext(FolderStatusManagementContext);
    const isMounted = useRef(false);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleRefresh = () => {
        setValue("");
    }

    const handleReload = () => {
        if(state.isLoading) { return; }
        handleRefresh();
        dispatch({ type: "handleReRenderOn" });
    }

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    })

    // 表示するフォルダのセット
    useEffect(() => {
        if(isMounted.current) {
            setFolders(state.all_folders);
        }
    }, [state.all_folders])

    // フォルダ検索欄に入力が行われた際に表示するフォルダの一覧のセット
    useEffect(() => {
        if(!state.reRender && !state.isLoading) {
            const filtered_folders = state.all_folders.filter((folder) => folder.name.toLowerCase().includes(value.toLowerCase()));
            setFolders(filtered_folders);
        }
    }, [value])

    return (
        <Box>
            {/* フォルダ検索部分 */}
            <FolderSearchBar
                handleChange={ handleChange }
                handleRefresh={ handleRefresh }
                handleReload={ handleReload }
                value={ value }
            />

            {/* フォルダ追加部分 */}
            <AddFolder handleReload={ handleReload } />

            {/* フォルダ一覧部分 */}
            <ViewFolderList
                folders={ folders }
                handleReload={ handleReload }
            />
        </Box>
    );
}

export default NavBarBody;