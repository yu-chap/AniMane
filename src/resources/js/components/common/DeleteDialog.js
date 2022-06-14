import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FolderStatusManagementContext } from '../FolderStatusManagement/FolderStatusManagement';

// Object削除の確認Dialog
// 閉じるを押せば削除キャンセル
// 削除を押せば選択objectを削除
// @content_text: Dialogに表示する説明文
const DeleteAlertDialog = ({ task_name, content_text, open, handleClose, handleSubmit, folder_key }) => {
    const [state, dispatch] = useContext(FolderStatusManagementContext);

    return (
        <Box>
            <Dialog open={ open } onClose={ handleClose }>
                <DialogTitle>{ task_name }</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { content_text }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose }>閉じる</Button>
                    {
                        (state.current_folderId === String(folder_key))
                        ?   <Button component={ Link } to="/app/home" onClick={ handleSubmit }>削除</Button>
                        :   <Button onClick={ handleSubmit }>削除</Button>
                    }
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default DeleteAlertDialog;