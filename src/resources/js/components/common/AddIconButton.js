import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditDialog from './EditDialog';

// Objectを追加するためのDialogを表示するボタン
// Objectの追加ボタンを押すと新しいObject作成する画面が表示され
// 閉じるまたは追加ボタンを押すと新しいObject作成のキャンセルまたは新しいObject作成が完了する
const AddIconButton = ({ task_name, id, label, open, error, errorText, handleClickOpen, handleChange, handleClose, handleSubmit, handleRefresh, value, submit_button_name, sx }) => {
    return (
        <Box>
            <Tooltip title={ task_name }>
                <IconButton
                    onClick={ handleClickOpen }
                    disableFocusRipple={ true }
                    sx={ sx }
                >
                    <AddIcon />
                </IconButton>
            </Tooltip>

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

export default AddIconButton;