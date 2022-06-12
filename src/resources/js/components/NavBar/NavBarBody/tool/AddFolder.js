import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddButton from '../../../common/AddButton';
import { NoticeContext } from '../../../common/Notification';
import { grey, yellow } from '@mui/material/colors';
import axios from 'axios';
import { NAV_BAR_WIDTH } from '../../NavBar';

// フォルダ追加機能 //
// フォルダの追加ボタンを押すと新しいフォルダ作成する画面が表示され
// 閉じるまたは追加ボタンを押すと新しいフォルダ作成のキャンセルまたは新しいフォルダ作成が完了する
// 入力は1字以上200字以下で制限する
const AddFolder = ({ handleReload }) => {
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

    const createFolder = () => {
        const abortCtrl = new AbortController()
        const timeout = setTimeout(() => { abortCtrl.abort() }, 10000);
        axios
            .post('/api/folders', { name: value.trim() }, { signal: abortCtrl.signal })
            .then(() => {
                console.log("Success");
                console.log(value.trim());
                loadAfterAction("フォルダの作成が完了しました");
            })
            .catch(() => {
                console.log("Fail to submit");
                loadAfterAction("フォルダの作成に失敗しました");
            })
            .finally(() => {
                clearTimeout(timeout);
            })
    }

    const handleSubmit = () => {
        if(value_validation(value)) {
            createFolder();
            handleClose();
        }
        else {
            handleError(errorMessage);
        }
    }

    const AddButton_sx = {
        width: NAV_BAR_WIDTH,
        height: 50,
        bgcolor: yellow[300],
        top: 180,
        left: "0%",
        position: "fixed",
        fontSize: 18,
        fontWeight: "bold",
        color: grey[900],
        "&:hover": { bgcolor: yellow[800] },
    };

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
                sx={ AddButton_sx }
            />
        </Box>
    );
}

export default AddFolder;