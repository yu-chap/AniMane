import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ItemManagement from '../components/ItemManagement/ItemManagement';
import { FolderStatusManagementContext } from '../components/FolderStatusManagement/FolderStatusManagement';
import SortManagement from '../components/common/SortManagement';

// /app/home/:folderId/itemsの画面へ出力する要素 //
// folderIdによって選択されたフォルダに関連するItems一覧を表示
const Folder = () => {
    const { folderId } = useParams();
    const [state, dispatch] = useContext(FolderStatusManagementContext);

    useEffect(() => {
        dispatch({ type: "setCurrentFolder", payload: folderId });
    }, [folderId])

    return (
        <Box key={ folderId } sx={{ display: "flex", justifyContent: "center" }}>
            <SortManagement>
                <ItemManagement folderId={ folderId } />
            </SortManagement>
        </Box>
    );
}

export default Folder;