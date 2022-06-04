import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ClearButton from '../common/ClearButton';
import { yellow } from '@mui/material/colors';
import useWindowDimensions from '../common/useWindowDimensions';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';

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

// SearchBarWidthを決定する関数 //
// minWidthを280, maxWidthを1100とし
// それ以外はBoxWidth-100とする
const getSearchBarWidth = (BoxWidth) => {
    const SearchBarWidth = BoxWidth - 100;
    if(SearchBarWidth > 1100) {
        return 1100;
    }
    else if(SearchBarWidth < 280) {
        return 280;
    }
    else {
        return SearchBarWidth;
    }
}


// フォルダ内アイテム検索バー //
const ItemSearchBar = ({ BoxWidth, handleReRender, handleChange, handleRefresh, handleReload, value }) => {
    const SearchBarWidth = getSearchBarWidth(BoxWidth);
    return (
        <Box sx={{ position: "fixed", display: "flex", justifyContent: "center", height: 100, width: BoxWidth }}>
            <Paper elevation={ 24 } sx={{ margin: "20px auto", display: "flex", alignItems: "center", width: SearchBarWidth }}>
                <IconButton disabled><SearchIcon /></IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="フォルダ内検索"
                    value={ value }
                    onChange={ handleChange }
                />
                { (value === "") ? null : <ClearButton title="検索のクリア" handleRefresh={ handleRefresh } /> }
                <Tooltip title="アニメの再読み込み" placement="bottom"><IconButton onClick={ handleReload }><RefreshIcon /></IconButton></Tooltip>
            </Paper>
        </Box>
    );
}

const Title = ({ folderId, BoxWidth }) => {
    const titleWidth = BoxWidth - 100;
    return (
        <Grid
            container
            sx={{ height: "60px", marginBottom: "5px", marginTop: "20px" }}
        >
            <Grid
                container
                item
                sx={{ width: titleWidth, display: "flex", justifyContent: "flex-start", alignItems: "flex-end" }}
            >
                <Box
                    component="div"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    fontSize={ 15 }
                    sx={{ width: "100%" }}
                >
                    { folderId + "の一覧" }
                </Box>
            </Grid>
            <Grid
                container
                item
                sx={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "flex-end" }}
            >
                <IconButton>
                    <AddIcon />
                </IconButton>
            </Grid>
            <Grid
                container
                item
                sx={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "flex-end" }}
            >
                <IconButton>
                    <SortIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

const ItemList = ({ BoxWidth }) => {
    const titleWidth = BoxWidth - 10;
    const items = new Array(100);
    for( let i = 0; i < items.length; i++) {
        items[i] = {
            "name": "Items" + String(i+1),
            "key": i+1,
        }
    }
    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Grid container direction="column" spacing={ 1 }>
            {
                items.map((item) => (
                    <Grid container item>
                        <Paper variant="outlined" sx={{ width: "100%", height: "50px", display: "flex", alignItems: "center" }}>
                            <Box
                                textOverflow="ellipsis"
                                overflow="hidden"
                                fontSize={ 20 }
                                sx={{ margin: "0px 5px", width: titleWidth }}
                            >
                                { item.name }
                            </Box>
                        </Paper>
                    </Grid>
                ))
            }
            </Grid>
        </Box>
    );
}

// 特定のフォルダにに属するアイテムの管理画面 //
// - 新しいアイテムの追加
// - 既存アイテムの編集
// - 既存アイテムの削除
// - アイテムのフォルダ内検索 を実装

const ItemManagement = ({ folderId }) => {
    const BoxWidth = getBoxWidth();

    return (
        <Box>
            <Box sx={{ width: BoxWidth, display: "flex", justifyContent: "center" }}>
                <Grid
                    container
                    direction="column"
                    sx={{ marginTop: "100px" }}
                >
                    <Grid container item>
                        {/* フォルダのタイトル */}
                        <Title folderId={ folderId } BoxWidth={ BoxWidth } />
                    </Grid>
                    <Divider />
                    <Grid container item>
                        {/* アイテム一覧 */}
                        <ItemList BoxWidth={ BoxWidth } />
                    </Grid>
                </Grid>
                {/* フォルダ内検索 */}
                <ItemSearchBar BoxWidth={ BoxWidth }/>
            </Box>
        </Box>
    );
}

export default ItemManagement;