import { useState, useEffect } from 'react';

// 画面のwidthとheightを取得する関数 //
export const useWindowDimensions = () => {
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
        useEffect(() => {
            const onResize = () => {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener('resize', onResize);
            return () => window.removeEventListener('resize', onResize);
        }, []);
    return windowDimensions;
}
