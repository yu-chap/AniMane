import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddItem from './AddItem';
import SortItem from './SortItem';

const FolderTitle = ({ folderId, BoxWidth, handleReload, handleSort }) => {
    const titleWidth = BoxWidth - 100;
    const contentList = [
        {
            "body": <Box
                        component="div"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        fontSize={ 15 }
                        fontWeight="bold"
                        sx={{ width: "100%" }}
                    >
                        { folderId + "の一覧" }
                    </Box>,
            "sx": { width: titleWidth, display: "flex", justifyContent: "flex-start", alignItems: "flex-end" },
        },
        {
            "body": <AddItem handleReload={ handleReload } />,
            "sx": { width: "50px", display: "flex", justifyContent: "center", alignItems: "flex-end" },
        },
        {
            "body": <SortItem handleSort={ handleSort } />,
            "sx": { width: "50px", display: "flex", justifyContent: "center", alignItems: "flex-end" },
        }
    ];

    return (
        <Grid
            container
            sx={{ height: "60px", marginBottom: "5px", marginTop: "20px" }}
        >
            { contentList.map((content, index) => {
                return (
                    <Grid
                        key={ index }
                        container
                        item
                        sx={ content.sx }
                    >
                        { content.body }
                    </Grid>
                );
            }) }
        </Grid>
    );
}

export default FolderTitle;