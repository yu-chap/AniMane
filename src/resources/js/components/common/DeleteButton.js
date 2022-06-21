import React from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteAlertDialog from './DeleteDialog';

// Objectの削除を行う画面を表するためのボタン
// ボタンを押すと削除画面を表示し
// 再度, ボタンを押すと閉じる
const DeleteButton = ({ task_name, content_text, open, handleClickOpen, handleClose, handleSubmit, aria_label, size, folder_key, sx }) => {
    return (
        <Box>
            <IconButton
                onClick={ handleClickOpen }
                aria-label={ aria_label }
                disableFocusRipple={ true }
                size={ size }
                sx={ sx }
            >
                <DeleteIcon />
            </IconButton>
            <DeleteAlertDialog
                task_name={ task_name }
                content_text={ content_text }
                open={ open }
                handleClose={ handleClose }
                handleSubmit={ handleSubmit }
                folder_key={ folder_key }
            />
        </Box>
    );
}

export default DeleteButton;