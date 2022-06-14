import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const box_sx = {
    width: "100%",
    height:"100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
};

/*** /app/homeのフォルダ未選択時の画面へ出力する要素 ***/
const Home = () => {
    return (
        <Box sx={ box_sx }>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs="auto">
                    <ContentPasteSearchIcon sx={{ fontSize: 90 }}></ContentPasteSearchIcon>
                </Grid>
                <Grid item xs="auto">
                    <Typography component="div">
                        <Box sx={{ textAlign: "center", fontWeight: "bold" }}>フォルダを選択してください</Box>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;