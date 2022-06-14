import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import DeleteButton from '../../common/DeleteButton';
import { NoticeContext } from '../../common/Notification';
import axios from 'axios';

// アイテム削除機能
// アイテムの削除ボタンを押すと削除画面が表示され
// 閉じるまたは削除ボタンを押すと削除のキャンセルまたは削除が完了する
const DeleteItem = ({ folderId, item, handleReload }) => {
    const [open, setOpen] = useState(false);
    const [state, dispatch] = useContext(NoticeContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        deleteItem();
        handleClose();
    }

    // API通信後に成功かエラーかを通知するための関数
    const ApiAfterAction = (payload) => {
        dispatch({ type: 'update_message', payload: payload });
        dispatch({ type: 'handleNoticeOpen' });
        handleReload();
    }

    const deleteItem = () => {
        const abortCtrl = new AbortController()
        const timeout = setTimeout(() => { abortCtrl.abort() }, 10000);
        axios
            .delete(`/api/folders/${folderId}/items/${item.id}`, { signal: abortCtrl.signal })
            .then(() => {
                ApiAfterAction(`アニメ(${item.name})の削除が完了しました`);
            })
            .catch(() => {
                ApiAfterAction(`アニメ(${item.name})の削除に失敗しました`);
            })
            .finally(() => {
                clearTimeout(timeout);
            })
    }

    return (
        <Box>
            <DeleteButton
                task_name="アニメの削除"
                content_text="本当にアニメの削除を行いますか？"
                open={ open }
                handleClickOpen={ handleClickOpen }
                handleClose={ handleClose }
                handleSubmit={ handleSubmit }
                aria_label="delete item"
                size="small"
            />
        </Box>
    );
}

export default DeleteItem;