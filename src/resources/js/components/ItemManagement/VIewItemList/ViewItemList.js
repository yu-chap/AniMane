import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EditItem from '../tool/EditItem';
import DeleteItem from '../tool/DeleteItem';
import { getBoxWidth } from '../tool/tool';

// アイテムの一覧表示 //
const ViewItemList = ({ folderId, bodyHeight, items, handleReload }) => {
    const BoxWidth = getBoxWidth();
    const titleWidth = BoxWidth - 90;

    // 各アイテムを表示するための枠組み //
    const PaperContent = ({ item }) => {
        const contentList = [
            {
                "body": <Tooltip title={ item.name } placement="bottom-end">
                            <Box
                                textOverflow="ellipsis"
                                overflow="hidden"
                                fontSize={ 20 }
                                sx={{ margin: "0px 5px", width: titleWidth - 10 }}
                            >
                                { item.name }
                            </Box>
                        </Tooltip>,
                "sx": { width: titleWidth, display: "flex", justifyContent: "flex-start", alignItems: "flex-end" }
            },
            {
                "body": <EditItem folderId={ folderId } item={ item } handleReload={ handleReload } />,
                "sx": { width: "40px", display: "flex", justifyContent: "center", alignItems: "flex-end" }
            },
            {
                "body": <DeleteItem folderId={ folderId } item={ item } handleReload={ handleReload } />,
                "sx": { width: "40px", display: "flex", justifyContent: "center", alignItems: "flex-end" }
            }
        ];

        return (
            <Paper variant="outlined" sx={{ width: "100%", height: "50px", display: "flex", alignItems: "center" }}>
                <Grid container>
                    {
                        contentList.map((content, index) => {
                            return (
                                <Grid key={ index } container item sx={ content.sx }>
                                    { content.body }
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Paper>
        );
    }

    // アイテム一覧 //
    const ItemList = () => {
        return (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <Grid container direction="column" spacing={ 1 }>
                {
                    items.map((item, index) => (
                        <Grid key={ index } container item>
                            <PaperContent item={ item } />
                        </Grid>
                    ))
                }
                </Grid>
            </Box>
        );
    }

    // 検索後に該当するアイテムが存在しない場合に表示する画面 //
    const NotExistItems = () => {
        const textList = [
            "該当するアニメが存在しません",
            "(アニメの作成を行ってください)"
        ];

        return (
            <Box sx={{ height: bodyHeight, width: BoxWidth, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Grid
                    container
                    direction="column"
                    sx={{ width: BoxWidth }}
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

    return (
        <Box>
            <ItemList />
        </Box>
    );
}

export default ViewItemList;