import React from "react";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { grey, yellow } from "@mui/material/colors";
import { useWindowDimensions } from "../components/common/tool";

const box_sx = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const grid_sx = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0px",
};

const button_sx = {
    width: "150px",
    height: "50px",
    fontWeight: "bold",
    color: grey[900],
    bgcolor: yellow[600],
    "&:hover": { color: grey[900], bgcolor: yellow[800] },
};

const getGridWidth = () => {
    const { width, _ } = useWindowDimensions();
    const gridWidth = width * 0.7;
    if(gridWidth < 300) {
        return 300;
    }
    else if(gridWidth > 1200) {
        return 1200;
    }
    else {
        return gridWidth;
    }
}

const NotFound = () => {
    const gridWidth = getGridWidth();
    const contentList = [
        {
            "body": <Typography variant="h6" fontWeight="bold">{ "お探しのページは見つかりませんでした(404)" }</Typography>
        },
        {
            "body": <Typography variant="body1">入力したアドレスに誤りがあるかページが移動した可能性があります。</Typography>
        },
        {
            "body": <Button component={ Link } to="/app/home" sx={ button_sx }>ホーム</Button>
        }
    ];

    return (
        <Box sx={ box_sx }>
            <Grid container direction="column" width={ gridWidth }>
                {
                    contentList.map((content, index) => {
                        return (
                            <Grid key={ index } container item sx={ grid_sx }>
                                { content.body }
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

export default NotFound;