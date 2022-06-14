import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { NAV_BAR_WIDTH } from '../../NavBar';

// フォルダのロード中に表示するコンポーネント
const LoadingFolder = ({ NavBarBody_h }) => {
    return (
        <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ width: NAV_BAR_WIDTH, height: NavBarBody_h }}
        >
        </Skeleton>
    );
}

export default LoadingFolder;