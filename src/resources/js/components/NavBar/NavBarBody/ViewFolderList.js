import React, { useState, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderIcon from '@mui/icons-material/Folder';
import EditFolder from './EditFolder';
import DeleteFolder from './DeleteFolder';
import { yellow } from '@mui/material/colors';


// 画面のwidthとheightを取得する関数 //
const useWindowDimensions = () => {
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
        useEffect(() => {
            const onResize = () => {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener('resize', onResize);
            return () => window.removeEventListener('resize', onResize);
        }, []);
    return windowDimensions;
}

// フォルダ一覧を表示するコンポーネント //
const ViewFolderList = ({ items, NavBarWidth, handleReload }) => {
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
                        <EditFolder folder_key={ items[index].key } handleReload={ handleReload } />
                        <DeleteFolder folder_key={ items[index].key } handleReload={ handleReload } />
                    </ListItemIcon>
                }
            >
                <Tooltip title={ items[index].name } placement="bottom-end">
                <ListItemButton>
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
                        { items[index].name }
                    </Box>
                </ListItemButton>
                </Tooltip>
            </ListItem>
        );
    };

    return (
        <Box sx={{ width: NavBarWidth, height: NavBarBody_h, position: "fixed", bgcolor: yellow[100], top: 230, left: "0%" }}>
            <FixedSizeList
                height={ NavBarBody_h }
                width={ NavBarWidth }
                itemSize={ 50 }
                itemCount={ items.length }
                overscanCount={ 5 }
            >
                { renderRow }
            </FixedSizeList>
        </Box>
    );
}

export default ViewFolderList;