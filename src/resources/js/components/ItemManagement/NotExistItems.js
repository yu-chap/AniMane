import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getBodyHeight, getBoxWidth } from './tool/tool';

// 検索後に該当するアイテムが存在しない場合に表示する画面 //
const NotExistItems = () => {
    const bodyHeight = getBodyHeight();
    const BoxWidth = getBoxWidth();
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

export default NotExistItems;