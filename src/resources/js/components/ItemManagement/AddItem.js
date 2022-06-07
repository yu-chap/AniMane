import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AddIconButton from '../common/AddIconButton';

// アイテム追加機能 //
// アイテムの追加ボタンを押すと新しいアイテムを作成する画面が表示され
// 閉じるまたは追加ボタンを押すと新しいアイテム作成のキャンセルまたは新しいアイテム作成が完了する
// 入力は1字以上100字以下(数字, アルファベット, _)で制限する
const AddItem = ({ handleReload }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const [errorText, setErrorText] = useState();
    const errorMessage = "1字以上100字以下で記入してください。";
    const inputProps = {
        maxLength: 100,
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
        if(target_value.length <= inputProps.maxLength && target_value.length > 0) {
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
            <AddIconButton
                    task_name="新しいアニメの作成"
                    id="new_item_name"
                    label="新しいアニメ名"
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
                />
        </Box>
    );
}

export default AddItem;