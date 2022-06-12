import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import EditFolder from '../tool/EditFolder';
import DeleteFolder from '../tool/DeleteFolder';
import LoadingIcon from '../../../common/LoadingIcon';
import { grey, yellow } from '@mui/material/colors';
import { useWindowDimensions } from '../../../common/tool';
import { FolderStatusManagementContext } from '../../../FolderStatusManagement/FolderStatusManagement';
import { NAV_BAR_WIDTH } from '../../NavBar';

// フォルダ一覧を表示するコンポーネント //
const ViewFolderList = ({ folders, handleReload }) => {
    const { _, height } = useWindowDimensions();
    const NavBarBody_h = height - 290;  // headerとfooterのheightを引いた残りの高さ
    const [state, dispatch] = useContext(FolderStatusManagementContext);

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

    const NotExistFolders = () => {
        const textList = [
            "該当するフォルダーが存在しません",
            "(フォルダの作成を行ってください)"
        ];

        return (
            <Box sx={{ width: NAV_BAR_WIDTH, height: NavBarBody_h, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Grid
                    container
                    direction="column"
                    sx={{ width: NAV_BAR_WIDTH }}
                >
                    {
                        textList.map((text, index) => {
                            return (
                                <Grid
                                    key={ index }
                                    container
                                    item
                                    sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                    <Typography fontWeight="bold">
                                        { text }
                                    </Typography>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Box>
        );
    }

    const LoadingFolder = () => {
        return (
            <Skeleton animation="wave" variant="rectangular" sx={{ width: NAV_BAR_WIDTH, height: NavBarBody_h }}>
            </Skeleton>
        );
    }

    const Main = () => {
        return (
            <Box>
                { (folders.length) ? <FolderList /> : <NotExistFolders /> }
            </Box>
        );
    }

    return (
        <Box sx={{ width: NAV_BAR_WIDTH, height: NavBarBody_h, position: "fixed", bgcolor: yellow[100], top: 230, left: "0%" }}>
            { (state.isLoading) ? <LoadingFolder /> : <Main /> }
        </Box>
    );
}

export default ViewFolderList;