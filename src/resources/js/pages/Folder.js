import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemManagement from '../components/ItemManagement/ItemManagement';

// /app/home/:id/itemsの画面へ出力する要素 //
// idによって選択されたフォルダに関連するItems一覧を表示
const Folder = () => {
    const { folderId } = useParams();
    const [items, setItems] = useState(null);

    useEffect(() => {
        setItems(folderId);
    }, [folderId])

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ItemManagement folderId={ folderId } />
        </Box>
    );
}

export default Folder;