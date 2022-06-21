import React from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditDialog from './EditDialog';

// Objectの編集を行う画面を表するためのボタン
// ボタンを押すと編集画面を表示し
// 再度, ボタンを押すと閉じる
const EditButton = ({ task_name, id, label, open, error, errorText, handleClickOpen, handleChange, handleClose, handleSubmit, handleRefresh, value, submit_button_name, aria_label, size, sx }) => {
    return (
        <Box>
            <IconButton
                onClick={ handleClickOpen }
                aria-label={ aria_label }
                disableFocusRipple={ true }
                size={ size }
                sx={ sx }
            >
                <EditIcon />
            </IconButton>
            <EditDialog
                task_name={ task_name }
                id={ id }
                label={ label }
                open={ open }
                error={ error }
                errorText={ errorText }
                handleChange={ handleChange }
                handleClose={ handleClose }
                handleSubmit={ handleSubmit }
                handleRefresh={ handleRefresh }
                value={ value }
                submit_button_name={ submit_button_name }
            />
        </Box>
    );
}

export default EditButton;