import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import DeleteButton from '../../../common/DeleteButton';
import { NoticeContext } from '../../../common/Notification';
import axios from 'axios';

// フォルダ削除機能
// フォルダの削除ボタンを押すと削除画面が表示され
// 閉じるまたは削除ボタンを押すと削除のキャンセルまたは削除が完了する
const DeleteFolder = ({ folder, handleReload }) => {
    const [open, setOpen] = useState(false);
    const [state, dispatch] = useContext(NoticeContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        deleteFolder();
        handleClose();
    }

    // API通信後に成功かエラーかを通知するための関数
    const ApiAfterAction = (payload) => {
        dispatch({ type: 'update_message', payload: payload });
        dispatch({ type: 'handleNoticeOpen' });
        handleReload();
    }

    const deleteFolder = () => {
        const abortCtrl = new AbortController()
        const timeout = setTimeout(() => { abortCtrl.abort() }, 10000);
        axios
            .delete(`/api/folders/${folder.id}`, { signal: abortCtrl.signal })
            .then(() => {
                ApiAfterAction(`フォルダ(${folder.name})の削除が完了しました`);
            })
            .catch(() => {
                ApiAfterAction(`フォルダ(${folder.name})の削除に失敗しました`);
            })
            .finally(() => {
                clearTimeout(timeout);
            })
    }

    return (
        <Box>
            <DeleteButton
                task_name="フォルダの削除"
                content_text="本当にフォルダの削除を行いますか？"
                open={ open }
                handleClickOpen={ handleClickOpen }
                handleClose={ handleClose }
                handleSubmit={ handleSubmit }
                aria_label="delete folder"
                size="small"
                folder_key={ folder.id }
            />
        </Box>
    );
}

export default DeleteFolder;