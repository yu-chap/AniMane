import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
    "タイトル順",
    "逆タイトル順",
    "作成日順",
    "最新",
];

const SortItem = ({ handleSort }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSortIndex = (index) => {
        handleSort(index);
        handleClose();
    }

    return (
        <Box>
            <Tooltip title="並び替え">
                <IconButton
                    id="sort-button"
                    aria-controls={ open ? "sort-menu" : undefined }
                    aria-haspopup="true"
                    aria-expanded={ open ? "true" : undefined }
                    onClick={ handleClick }
                >
                    <SortIcon />
                </IconButton>
            </Tooltip>

            <Menu
                id="sort-menu"
                anchorEl={ anchorEl }
                open={ open }
                onClose={ handleClose }
                MenuListProps={{
                    "aria-labelledby": "sort-button",
                }}
            >
                { options.map((option, index) => {
                    return (
                        <MenuItem
                            key={ index }
                            onClick={ () => { handleSortIndex(index); } }
                        >
                            { option }
                        </MenuItem>
                    );
                }) }
            </Menu>
        </Box>
    );
}

export default SortItem;
