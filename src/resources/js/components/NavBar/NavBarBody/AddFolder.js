import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddButton from '../../common/AddButton';
import { grey, yellow } from '@mui/material/colors';

// フォルダ追加機能 //
// フォルダの追加ボタンを押すと新しいフォルダ作成する画面が表示され
// 閉じるまたは追加ボタンを押すと新しいフォルダ作成のキャンセルまたは新しいフォルダ作成が完了する
// 入力は1字以上100字以下(数字, アルファベット, _)で制限する
const AddFolder = ({ NavBarWidth, handleReload }) => {
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
            console.log(value);
            handleReload();
        }
        else {
            handleError(errorMessage);
        }
    }

    return (
        <Box>
            <AddButton
                startIcon={ <CreateNewFolderIcon /> }
                button_name="フォルダの追加"
                task_name="新しいフォルダの作成"
                id="new_folder_name"
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
                submit_button_name="追加"
                sx={{ width: NavBarWidth, height: 50, bgcolor: yellow[300], top: 180, left: "0%", position: "fixed", fontSize: 18, color: grey[900] }}
            />
        </Box>
    );
}

export default AddFolder;