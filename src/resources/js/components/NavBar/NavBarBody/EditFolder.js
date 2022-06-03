import React, { useState } from 'react';
import Box from '@mui/material/Box';
import EditButton from '../../common/EditButton';

// フォルダ編集機能 //
// フォルダの編集ボタンを押すとフォルダを編集する画面が表示され
// 閉じるまたは編集ボタンを押すとフォルダ編集のキャンセルまたはフォルダ編集が完了する
// 入力は1字以上100字以下(数字, アルファベット, _)で制限する
// @folder_key: 編集するフォルダのkey
const EditFolder = ({ folder_key, handleReload }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const [errorText, setErrorText] = useState();
    const errorMessage = "1字以上100字以下(数字, アルファベット, _)で記入してください。";
    const inputProps = {
        maxLength: 100,
        pattern: "^[a-zA-Z0-9_]+$",
    };

    const handleErrorRefresh = () => {
        setErrorText("");
        setError(false);
    }

    const handleError = (errorMessage) => {
        setErrorText(errorMessage);
        setError(true);
    }

    const handleRefresh = () => {
        setValue("");
        handleErrorRefresh();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleRefresh();
        handleErrorRefresh();
    };

    const value_validation = (target_value) => {
        if(target_value.length <= inputProps.maxLength && target_value.match(inputProps.pattern) && target_value.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value);
        if(value_validation(e.target.value)) {
            handleErrorRefresh();
        }
        else {
            handleError(errorMessage);
        }
    };

    const handleSubmit = () => {
        if(value_validation(value)) {
            handleClose();
            console.log(`Folder Name: ${value}, its key is ${folder_key}`);
            handleReload();
        }
        else {
            handleError(errorMessage);
        }
    }

    return (
        <Box>
            <EditButton
                task_name="フォルダの編集"
                id="edit folder"
                label="新しいフォルダ名"
                open={ open }
                error={ error }
                errorText={ errorText }
                handleClickOpen={ handleClickOpen }
                handleChange={ handleChange }
                handleClose={ handleClose }
                handleSubmit={ handleSubmit }
                handleRefresh={ handleRefresh }
                value={ value }
                submit_button_name="完了"
                aria_label="edit_folder"
                size="small"
            />
        </Box>
    );
}

export default EditFolder;