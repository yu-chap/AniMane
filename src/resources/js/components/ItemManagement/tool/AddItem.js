import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import AddIconButton from '../../common/AddIconButton';
import { NoticeContext } from '../../common/Notification';
import axios from 'axios';
import { value_validation } from '../../common/tool';

// アイテム追加機能
// アイテムの追加ボタンを押すと新しいアイテムを作成する画面が表示され
// 閉じるまたは追加ボタンを押すと新しいアイテム作成のキャンセルまたは新しいアイテム作成が完了する
// 入力は1字以上200字以下で制限する
const AddItem = ({ folderId, handleReload }) => {
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
            createItem();
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

    const createItem = () => {
        const abortCtrl = new AbortController()
        const timeout = setTimeout(() => { abortCtrl.abort() }, 10000);
        axios
            .post(`/api/folders/${folderId}/items`, { name: value.trim() }, { signal: abortCtrl.signal })
            .then(() => {
                ApiAfterAction("アニメの作成が完了しました");
            })
            .catch(() => {
                ApiAfterAction("アニメの作成に失敗しました");
            })
            .finally(() => {
                clearTimeout(timeout);
            })
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