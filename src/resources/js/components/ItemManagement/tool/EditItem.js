import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import EditButton from '../../common/EditButton';
import { NoticeContext } from '../../common/Notification';
import axios from 'axios';

// アイテム編集機能 //
// アイテムの編集ボタンを押すとアイテムを編集する画面が表示され
// 閉じるまたは編集ボタンを押すとアイテム編集のキャンセルまたはアイテム編集が完了する
// 入力は1字以上100字以下(数字, アルファベット, _)で制限する
// @item_key: 編集するアイテムのkey
const EditItem = ({ folderId, item, handleReload }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const [errorText, setErrorText] = useState();
    const [state, dispatch] = useContext(NoticeContext);
    const errorMessage = "1字以上200字以下で記入してください。";
    const inputProps = {
        maxLength: 200,
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
        target_value = target_value.trim();
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

    const loadAfterAction = (payload) => {
        dispatch({ type: 'update_message', payload: payload });
        dispatch({ type: 'handleNoticeOpen' });
        handleReload();
    }

    const updateItem = () => {
        const abortCtrl = new AbortController()
        const timeout = setTimeout(() => { abortCtrl.abort() }, 10000);
        axios
            .put(`/api/folders/${folderId}/items/${item.id}`, { name: value.trim() }, { signal: abortCtrl.signal })
            .then(() => {
                console.log("Success");
                console.log(value.trim());
                loadAfterAction(`アニメ(${item.name})の更新が完了しました`);
            })
            .catch(() => {
                console.log("Fail to submit");
                loadAfterAction(`アニメ(${item.name})の更新に失敗しました`);
            })
            .finally(() => {
                clearTimeout(timeout);
            })
    }

    const handleSubmit = () => {
        if(value_validation(value)) {
            updateItem();
            handleClose();
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