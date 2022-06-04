import React from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import EditFolder from './EditFolder';
import DeleteFolder from './DeleteFolder';
import { grey, yellow } from '@mui/material/colors';
import useWindowDimensions from '../../common/useWindowDimensions';

// フォルダ一覧を表示するコンポーネント //
const ViewFolderList = ({ folders, NavBarWidth, handleReload }) => {
    const { _, height } = useWindowDimensions();
    const NavBarBody_h = height - 290;  // headerとfooterのheightを引いた残りの高さ

    const renderRow = ({ index, style }) => {
        return (
            <ListItem
                style={ style }
                key={ index }
                component="div"
                disablePadding
                secondaryAction={
                    <ListItemIcon>
                        <EditFolder folder_key={ folders[index].key } handleReload={ handleReload } />
                        <DeleteFolder folder_key={ folders[index].key } handleReload={ handleReload } />
                    </ListItemIcon>
                }
            >
                <Tooltip title={ folders[index].name } placement="bottom-end">
                <ListItemButton component={ Link } to={ "/app/home/folders/" + folders[index].key + "/items" } sx={{ "&:hover": { color: grey[900] } }}>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <Box
                        component="div"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        fontSize={ 15 }
                        width={ NavBarWidth - 170 }
                    >
                        { folders[index].name }
                    </Box>
                </ListItemButton>
                </Tooltip>
            </ListItem>
        );
    };

    const FolderList = () => {
        return (
            <FixedSizeList
                height={ NavBarBody_h }
                width={ NavBarWidth }
                itemSize={ 50 }
                itemCount={ folders.length }
                overscanCount={ 5 }
            >
                { renderRow }
            </FixedSizeList>
        );
    }

    const NotExistFolders = () => {
        return (
            <Box sx={{ width: NavBarWidth, height: NavBarBody_h, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography fontWeight="bold">
                    該当するフォルダーが存在しません
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: NavBarWidth, height: NavBarBody_h, position: "fixed", bgcolor: yellow[100], top: 230, left: "0%" }}>
            { (folders.length) ? <FolderList /> : <NotExistFolders /> }
        </Box>
    );
}

export default ViewFolderList;