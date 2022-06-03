import React, { useState } from 'react';
import Box from '@mui/material/Box';
import DeleteButton from '../../common/DeleteButton';

// フォルダ削除機能 //
// フォルダの削除ボタンを押すと削除画面が表示され
// 閉じるまたは削除ボタンを押すと削除のキャンセルまたは削除が完了する
const DeleteFolder = ({ folder_key, handleReload }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log(`Delete Folder key is ${folder_key}`);
        handleClose();
        handleReload();
    }

    return (
        <Box>
            <DeleteButton
                task_name="フォルダの削除"
                content_text="本当にフォルダの削除を行いますか？"
                open={ open }
                handleClickOpen={ handleClickOpen }
                handleClose={ handleClose }
                handleSubmit={ handleSubmit }
                aria_label="delete folder"
                size="small"
            />
        </Box>
    );
}

export default DeleteFolder;