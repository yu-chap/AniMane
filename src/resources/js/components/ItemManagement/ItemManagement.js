import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import useWindowDimensions from '../common/useWindowDimensions';
import FolderTitle from './FolderTitle';
import ItemSearchBar from './ItemSearchBar';
import ViewItemList from './ViewItemList';
import LoadingIcon from '../common/LoadingIcon';

// BoxWidthを決定する関数 //
// minWidthを300, maxWidthを1200とし
// それ以外はwindow widthの7割とする
const getBoxWidth = () => {
    const { width, _ } = useWindowDimensions();
    const BoxWidth = width * 0.7;
    if(BoxWidth > 1200) {
        return 1200;
    }
    else if(BoxWidth < 300) {
        return 300;
    }
    else {
        return BoxWidth;
    }
}

// Body画面の高さ //
const getBodyHeight = () => {
    const {_, height} = useWindowDimensions();
    return height - 190;
}

// 特定のフォルダにに属するアイテムの管理画面 //
// - 新しいアイテムの追加
// - 既存アイテムの編集
// - 既存アイテムの削除
// - アイテムのフォルダ内検索 を実装

const ItemManagement = ({ folderId }) => {
    const BoxWidth = getBoxWidth();
    const all_items = new Array(100);
    for(let i = 0; i < 100; i++) {
        all_items[i] = {
            "name": "Item" + String(i+1),
            "key": i+1,
        }
    }

    const [items, setItems] = useState([]);
    const [value, setValue] = useState("");
    const [reRender, setReRender] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sortIndex, setSortIndex] = useState(0);
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
        console.log("Refreshed Items");
    }

    const handleSort = (index) => {
        setSortIndex(index);
    }

    const SleepByPromiss = (sec) => {
        return new Promise(resolve => setTimeout(resolve, sec*1000));
    }

    const items_fetch = async () => {
        setIsLoading(true);
        await SleepByPromiss(5);
        if(isMoutedRef.current) {
            setItems(all_items);
            setIsLoading(false);
            setReRender(false);
            console.log("ReRendered Items");
        }
    }

    useEffect(() => {
        isMoutedRef.current = true;
        return () => {
            isMoutedRef.current = false;
            console.log("Unmounted");
        }
    }, [])

    useEffect(() => {
        items_fetch();
    }, [folderId])

    useEffect(() => {
        if(reRender) {
            items_fetch();
        }
    }, [reRender])

    useEffect(() => {
        if(!reRender && !isLoading) {
            const filtered_items = all_items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
            setItems(filtered_items);
            console.log("Search");
        }
    }, [value])

    useEffect(() => {
        if(!isLoading) {
            console.log("Sorted by" + sortIndex);
        }
    }, [sortIndex])

    // コンテンツのMain部分 //
    // フォルダのタイトルとアイテム一覧を表示
    const Main = () => {
        const bodyHeight = getBodyHeight();

        return (
            <Grid
                container
                direction="column"
                sx={{ marginTop: "100px" }}
            >
                {/* フォルダのタイトル */}
                <Grid container item>
                    <FolderTitle folderId={ folderId } BoxWidth={ BoxWidth } handleReload={ handleReload } handleSort={ handleSort } />
                </Grid>
                <Divider />
                {/* アイテム一覧 */}
                <Grid container item>
                    {
                        (isLoading) ?
                        <LoadingIcon sx={{ height: bodyHeight, width: BoxWidth, display: "flex", justifyContent: "center", alignItems: "center"}} /> :
                        <ViewItemList BoxWidth={ BoxWidth } bodyHeight={ bodyHeight } items={ items } handleReload={ handleReload } />
                    }
                </Grid>
            </Grid>
        );
    }

    return (
        <Box sx={{ width: BoxWidth, display: "flex", justifyContent: "center" }}>
            <Main />
            {/* フォルダ内検索 */}
            <ItemSearchBar
                BoxWidth={ BoxWidth }
                handleChange={ handleChange }
                handleRefresh={ handleRefresh }
                handleReload={ handleReload }
                value={ value }
            />
        </Box>
    );
}

export default ItemManagement;