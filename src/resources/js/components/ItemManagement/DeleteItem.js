import React, { useState } from 'react';
import Box from '@mui/material/Box';
import DeleteButton from '../common/DeleteButton';

// アイテム削除機能 //
// アイテムの削除ボタンを押すと削除画面が表示され
// 閉じるまたは削除ボタンを押すと削除のキャンセルまたは削除が完了する
const DeleteItem = ({ item_key, handleReload }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log(`Delete Item key is ${item_key}`);
        handleClose();
        handleReload();
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