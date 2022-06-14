import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import AddItem from '../tool/AddItem';
import SortItem from '../tool/SortItem';
import { FolderStatusManagementContext } from '../../FolderStatusManagement/FolderStatusManagement';
import { NoticeContext } from '../../common/Notification';
import { getBoxWidth } from '../tool/tool';
import LoadingTitle from './LoadingTiltle';

/*** アイテム一覧表示中のフォルダタイトルの表示 ***/

// コンテンツMain部分
const Main = ({ folderId, current_folder, titleWidth, handleReload, isLoading }) => {

    const contentList = [
        {
            "body": <Tooltip title={ `${current_folder.name}の一覧` } placement="bottom-end">
                        <Box
                            component="div"
                            textOverflow="ellipsis"
                            overflow="hidden"
                            fontSize={ 15 }
                            fontWeight="bold"
                            sx={{ width: "100%", height: "20px", marginBottom: "10px" }}
                        >
                            { `${current_folder.name}の一覧` }
                        </Box>
                    </Tooltip>,
            "sx": { width: titleWidth, display: "flex", justifyContent: "flex-start", alignItems: "flex-end" },
        },
        {
            "body": <AddItem folderId={ folderId } handleReload={ handleReload } />,
            "sx": { width: "50px", display: "flex", justifyContent: "center", alignItems: "flex-end" },
        },
        {
            "body": <SortItem isLoading={ isLoading } />,
            "sx": { width: "50px", display: "flex", justifyContent: "center", alignItems: "flex-end" },
        }
    ];

    return (
        <Grid
            container
            sx={{ height: "60px", marginBottom: "5px", marginTop: "20px" }}
        >
            {
                contentList.map((content, index) => {
                    return (
                        <Grid
                            key={ index }
                            container
                            item
                            sx={ content.sx }
                        >
                            { content.body }
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}

const FolderTitle = ({ folderId, handleReload, isLoading }) => {
    const titleWidth = getBoxWidth() - 100;
    const [state, dispatch] = useContext(FolderStatusManagementContext);
    const [notice_state, notice_dispatch] = useContext(NoticeContext);
    const [folder, setFolder] = useState(null);
    const navigate = useNavigate();

    // フォルダタイトルが読み込めない場合の通知
    const NotFound = () => {
        notice_dispatch({ type: "update_message", payload: "フォルダの読み込みに失敗したか存在しないページにアクセスした可能性があります" });
        notice_dispatch({ type: "handleNoticeOpen" });
        navigate('/app/home', { replace: true });
    }

    // 現在選択されたフォルダタイトルの取得
    useEffect(() => {
        if(!state.isLoading) {
            if(state.all_folders != null) {
                const current_folder = state.all_folders.find((item) => String(item.id) === folderId);
                setFolder(current_folder);
                if(current_folder == null) {
                    NotFound();
                }
            }
        }
    }, [state.isLoading])

    return (
        <Box>
            {
                (state.isLoading || folder == null)
                ?   <LoadingTitle />
                :   <Main
                        folderId={ folderId }
                        current_folder={ folder }
                        titleWidth={ titleWidth }
                        handleReload={ handleReload }
                        isLoading={ isLoading }
                    />
            }
        </Box>
    );
}

export default FolderTitle;