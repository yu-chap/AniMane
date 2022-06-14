import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderIcon from '@mui/icons-material/Folder';
import EditFolder from '../tool/EditFolder';
import DeleteFolder from '../tool/DeleteFolder';
import { grey, yellow } from '@mui/material/colors';
import { useWindowDimensions } from '../../../common/tool';
import { FolderStatusManagementContext } from '../../../FolderStatusManagement/FolderStatusManagement';
import { NAV_BAR_WIDTH } from '../../NavBar';
import NotExistFolders from './NotExitstFoders';
import LoadingFolder from './LoadingFolder';

// フォルダ一覧を表示するコンポーネント
const ViewFolderList = ({ folders, handleReload }) => {
    const { _, height } = useWindowDimensions();
    const NavBarBody_h = height - 290;  // headerとfooterのheightを引いた残りの高さ
    const [state, dispatch] = useContext(FolderStatusManagementContext);

    // フォルダ一覧表示の各要素
    // - フォルダの選択
    // - フォルダの編集
    // - フォルダの削除が可能
    const renderRow = ({ index, style }) => {
        return (
            <ListItem
                style={ style }
                key={ index }
                component="div"
                disablePadding
                secondaryAction={
                    <ListItemIcon>
                        <EditFolder folder={ folders[index] } handleReload={ handleReload } />
                        <DeleteFolder folder={ folders[index] } handleReload={ handleReload } />
                    </ListItemIcon>
                }
            >
                <Tooltip title={ folders[index].name } placement="bottom-end">
                <ListItemButton component={ Link } to={ "/app/home/folders/" + folders[index].id + "/items" } sx={{ "&:hover": { color: grey[900] } }}>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <Box
                        component="div"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        fontSize={ 15 }
                        width={ NAV_BAR_WIDTH - 170 }
                    >
                        { folders[index].name }
                    </Box>
                </ListItemButton>
                </Tooltip>
            </ListItem>
        );
    };

    // フォルダの一覧表示
    const FolderList = () => {
        return (
            <FixedSizeList
                height={ NavBarBody_h }
                width={ NAV_BAR_WIDTH }
                itemSize={ 50 }
                itemCount={ folders.length }
                overscanCount={ 5 }
            >
                { renderRow }
            </FixedSizeList>
        );
    }

    const Main = () => {
        return (
            <Box>
                { (folders.length) ? <FolderList /> : <NotExistFolders NavBarBody_h={ NavBarBody_h } /> }
            </Box>
        );
    }

    const box_sx = {
        width: NAV_BAR_WIDTH,
        height: NavBarBody_h,
        position: "fixed",
        bgcolor: yellow[100],
        top: 230,
        left: "0%",
    };

    return (
        <Box sx={ box_sx }>
            { (state.isLoading) ? <LoadingFolder NavBarBody_h={ NavBarBody_h }/> : <Main /> }
        </Box>
    );
}

export default ViewFolderList;