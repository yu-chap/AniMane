import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import FolderTitle from './FolderTitle/FolderTitle';
import ItemSearchBar from './tool/ItemSearchBar';
import ViewItemList from './VIewItemList/ViewItemList';
import InfiniteScroll from 'react-infinite-scroller';
import Skeleton from '@mui/material/Skeleton';
import { SortContext } from '../common/SortManagement';
import { getBoxWidth, getBodyHeight } from './tool/tool';
import NotExistItems from './NotExistItems';
import { NoticeContext } from '../common/Notification';

// 特定のフォルダにに属するアイテムの管理画面
// - 新しいアイテムの追加
// - 既存アイテムの編集
// - 既存アイテムの削除
// - アイテムのフォルダ内検索 を実装
const ItemManagement = ({ folderId }) => {
    const BoxWidth = getBoxWidth();
    const bodyHeight = getBodyHeight();
    const [items, setItems] = useState([]);
    const [value, setValue] = useState("");
    const [reRender, setReRender] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [state, dispatch] = useContext(SortContext);
    const [notice_state, notice_dispatch] = useContext(NoticeContext);
    const navigate = useNavigate();
    const isMounted = useRef(false);
    const page = useRef(1);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleReRender = () => {
        setReRender(true);
    }

    const handleRefresh = () => {
        setValue("");
    }

    const handleReload = () => {
        if(isLoading || !isMounted.current) { return; }
        handleRefresh();
        setIsLoading(true);
        setItems([]);
        page.current = 1;
        handleReRender();
        setHasMore(true);
    }

    const handleSubmit = () => {
        if(isLoading || !isMounted.current) { return; }
        if(value.trim() === "") { return; }
        setHasMore(false);
        setIsLoading(true);
        setItems([]);
        searchItems();
    }

    const failedToLoad = () => {
        notice_dispatch({ type: "update_message", payload: "アニメの読み込みに失敗しました" });
        notice_dispatch({ type: "handleNoticeOpen" });
        navigate('/app/home', { replace: true });
    }

    const fetchItems = async (page) => {
        let res;
        const abortCtrl = new AbortController()
        const timeout = setTimeout(() => { abortCtrl.abort() }, 10000);
        try {
            switch(state.sortIndex) {
                // 最新順にitem取得 //
                case 1:
                    res = await fetch(`/api/folders/${folderId}/items?page=${page}&sort=latest`, { signal: abortCtrl.signal });
                    break;

                // タイトル順にitem取得 //
                case 2:
                    res = await fetch(`/api/folders/${folderId}/items?page=${page}&sort=title`, { signal: abortCtrl.signal });
                    break

                // 作成順にitem取得 //
                default:
                    res = await fetch(`/api/folders/${folderId}/items?page=${page}&sort=oldest`, { signal: abortCtrl.signal });
                    break
            }
            if(!res.ok) {
                throw new Error(res.statusText);
            }
        } catch (error) {
            failedToLoad();
        } finally {
            clearTimeout(timeout);
        }
        return res;
    }

    const searchItems = async () => {
        const abortCtrl = new AbortController()
        const timeout = setTimeout(() => { abortCtrl.abort() }, 10000);
        try {
            const res = await fetch(`/api/folders/${folderId}/items/search?q=${value.trim()}`, { signal: abortCtrl.signal });
            if(!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            if(!isMounted.current) { return; }
            setItems(data);
            setIsLoading(false);
        } catch (error) {
            failedToLoad();
        } finally {
            clearTimeout(timeout);
        }
    }

    // Mountされた時点でアイテム読み込みを開始し
    // reRenderがtrueになるたびに再読み込み
    useEffect(() => {
        const getItems = async () => {
            const res = await fetchItems(1);
            if(isMounted.current) {
                const data = await res.json();
                if(data.last_page === page.current) {
                    setHasMore(false);
                }
                setItems(data.data);
                setIsLoading(false);
            }
        }

        if(reRender) {
            getItems();
            setReRender(false);
        }
    }, [reRender])

    // アイテムの並び替えが発生した場合に再読み込み
    useEffect(() => {
        if(!isLoading) {
            handleReload();
        }
    }, [state.sortIndex])

    // 無限スクロールで呼ばれるアイテムの読み込みを行う関数
    const loadMore = async () => {
        page.current++;
        const res = await fetchItems(page.current);
        if(isMounted.current) {
            const data = await res.json();
            if(data.last_page === page.current) {
                setHasMore(false);
            }
            setItems([...items, ...data.data]);
        }
    }

    // 無限スクロールで読み込み中に表示するコンポーネント
    const loader = (
            <Skeleton key={ 0 } variant="rectangular" sx={{ width: BoxWidth, height: "50px", marginTop: "10px" }} />
        );

    // 無限スクロール用のコンポーネント
    const ViewInfiniteScroll = () => {
        return (
            <Box sx={{ marginBottom: "100px" }}>
                <InfiniteScroll
                    pageStart={ 1 }
                    initialLoad={ false }
                    loadMore={ loadMore }
                    hasMore={ hasMore }
                    loader={ loader }
                >
                    <ViewItemList folderId={ folderId } items={ items } handleReload={ handleReload } />
                </InfiniteScroll>
            </Box>
        );
    }

    // アイテムが存在するときとそうでないときに表示する分岐
    const isNotExist = (
        (items.length) ? <ViewInfiniteScroll /> : <NotExistItems />
    );

    // コンテンツのMain部分
    // フォルダのタイトルとアイテム一覧を表示
    const Main = () => {
        return (
            <Grid
                container
                direction="column"
                sx={{ marginTop: "100px" }}
            >
                {/* フォルダのタイトル */}
                <Grid container item>
                    <FolderTitle folderId={ folderId } handleReload={ handleReload } isLoading={ isLoading } />
                </Grid>
                <Divider />

                {/* アイテム一覧 */}
                <Grid container item>
                    { (isLoading) ? (loader) : (isNotExist) }
                </Grid>
            </Grid>
        );
    }

    return (
        <Box sx={{ width: BoxWidth, display: "flex", justifyContent: "center" }}>
            <Main />
            {/* フォルダ内検索 */}
            <ItemSearchBar
                handleChange={ handleChange }
                handleRefresh={ handleRefresh }
                handleReload={ handleReload }
                handleSubmit={ handleSubmit }
                value={ value }
            />
        </Box>
    );
}

export default ItemManagement;