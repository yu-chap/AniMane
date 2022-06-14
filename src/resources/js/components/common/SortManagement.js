import React, { createContext, useReducer } from 'react';

// アイテムの並べ替えStateを管理する
// 0:  作成順
// 1:  最新順
// 2:  タイトル順
// でSortする

const initialState = {
    sortIndex: 0,
};

export const SortContext = createContext(initialState);

const SortManagement = ({ children }) => {

    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'setSortIndex':
                return { ...state, sortIndex: action.payload }

            default:
                return state;
        }
    }, initialState);

    return (
        <SortContext.Provider value={[state, dispatch]}>
            { children }
        </SortContext.Provider>
    );
}

export default SortManagement;