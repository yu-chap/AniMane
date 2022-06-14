import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import EditButton from '../../common/EditButton';
import { NoticeContext } from '../../common/Notification';
import axios from 'axios';
import { value_validation } from '../../common/tool';

// アイテム編集機能 //
// アイテムの編集ボタンを押すとアイテムを編集する画面が表示され
// 閉じるまたは編集ボタンを押すとアイテム編集のキャンセルまたはアイテム編集が完了する
// 入力は1字以上200字以下で制限する
const EditItem = ({ folderId, item, handleReload }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");
    const [errorText, setErrorText] = useState();
    const [state, dispatch] = useContext(NoticeContext);
    const errorMessage = "1字以上200字以下で記入してください。";

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
            updateItem();
            handleClose();
        }
        else {
            handleError(errorMessage);
        }
    }

    // API通信後に成功かエラーかを通知するための関数
    const ApiAfterAction = (payload) => {
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
                ApiAfterAction(`アニメ(${item.name})の更新が完了しました`);
            })
            .catch(() => {
                ApiAfterAction(`アニメ(${item.name})の更新に失敗しました`);
            })
            .finally(() => {
                clearTimeout(timeout);
            })
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