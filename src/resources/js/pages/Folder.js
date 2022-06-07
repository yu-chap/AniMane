import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import ItemManagement from '../components/ItemManagement/ItemManagement';

// /app/home/:folderId/itemsの画面へ出力する要素 //
// folderIdによって選択されたフォルダに関連するItems一覧を表示
const Folder = () => {
    const { folderId } = useParams();

    return (
        <Box key={ folderId } sx={{ display: "flex", justifyContent: "center" }}>
            <ItemManagement folderId={ folderId } />
        </Box>
    );
}

export default Folder;