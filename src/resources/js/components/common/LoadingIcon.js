import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';

const LoadingIcon = ({ sx }) => {
    return (
        <Box sx={ sx }>
            <Grid container direction="column" spacing={ 2 }>
                <Grid
                    container
                    item
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <LoadingButton loading fontSize="large" />
                </Grid>
                <Grid
                    container
                    item
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <Typography fontWeight="bold">
                        ロード中...
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LoadingIcon;