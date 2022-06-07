import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import AddFolder from './AddFolder';
import ViewFolderList from './ViewFolderList';
import FolderSearchBar from './FolderSearchBar';

// Navgation BarのBody部分 //
// - フォルダ一覧表示機能
// - フォルダの追加機能
// - フォルダの検索機能 を実装
const NavBarBody = ({ NavBarWidth }) => {
    const all_folders = new Array(100);
    for(let i = 0; i < 100; i++) {
        all_folders[i] = {
            "name": "FolderFolderFolder" + String(i+1),
            "key": i+1,
        }
    }

    const [folders, setFolders] = useState([]);
    const [value, setValue] = useState("");
    const [reRender, setReRender] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const isMoutedRef = useRef(false);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleReRender = () => {
        setReRender(true);
    }

    const handleRefresh = () => {
        setValue("");
    }

    const handleReload = () => {
        handleRefresh();
        handleReRender();
        console.log("Refreshed folders");
    }

    const SleepByPromiss = (sec) => {
        return new Promise(resolve => setTimeout(resolve, sec*1000));
    }

    const items_fetch = async () => {
            setIsLoading(true);
            await SleepByPromiss(5);
        if(isMoutedRef.current) {
            setFolders(all_folders);
            setIsLoading(false);
            setReRender(false);
            console.log("ReRendered Folders");
        }
    }

    useEffect(() => {
        isMoutedRef.current = true;
        return () => {
            isMoutedRef.current = false;
        }
    }, [])

    useEffect(() => {
        if(reRender) {
            items_fetch();
        }
    }, [reRender])

    useEffect(() => {
        if(!reRender && !isLoading) {
            const filtered_folders = all_folders.filter((folder) => folder.name.toLowerCase().includes(value.toLowerCase()));
            setFolders(filtered_folders);
            console.log("Search");
        }
    }, [value])

    return (
        <Box>
            {/* フォルダ検索部分 */}
            <FolderSearchBar
                NavBarWidth={ NavBarWidth }
                handleChange={ handleChange }
                handleRefresh={ handleRefresh }
                handleReload={ handleReload }
                value={ value }
            />

            {/* フォルダ追加部分 */}
            <AddFolder
                NavBarWidth={ NavBarWidth }
                handleReload={ handleReload }
            />

            {/* フォルダ一覧部分 */}
            <ViewFolderList
                folders={ folders }
                NavBarWidth={ NavBarWidth }
                handleReload={ handleReload }
                isLoading={ isLoading }
            />
        </Box>
    );
}

export default NavBarBody;