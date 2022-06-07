import React, { useState } from 'react';
import Box from '@mui/material/Box';
import EditButton from '../common/EditButton';

// アイテム編集機能 //
// アイテムの編集ボタンを押すとアイテムを編集する画面が表示され
// 閉じるまたは編集ボタンを押すとアイテム編集のキャンセルまたはアイテム編集が完了する
// 入力は1字以上100字以下(数字, アルファベット, _)で制限する
// @item_key: 編集するアイテムのkey
const EditItem = ({ item_key, handleReload }) => {
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
            console.log(`Item Name: ${value}, its key is ${item_key}`);
            handleReload();
        }
        else {
            handleError(errorMessage);
        }
    }

    return (
        <Box>
            <EditButton
                task_name="アニメの編集"
                id="edit item"
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
                submit_button_name="完了"
                aria_label="edit_item"
                size="small"
            />
        </Box>
    );
}

export default EditItem;