import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { NAV_BAR_WIDTH } from '../../NavBar';

// フォルダが存在しない場合に表示するコンポーネント
const NotExistFolders = ({ NavBarBody_h }) => {
    const textList = [
        "該当するフォルダーが存在しません",
        "(フォルダの作成を行ってください)"
    ];

    const box_sx = {
        width: NAV_BAR_WIDTH,
        height: NavBarBody_h,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const grid_sx = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <Box sx={ box_sx }>
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
                                sx={ grid_sx }
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

export default NotExistFolders;