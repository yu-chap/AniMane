import React, { createContext, useReducer } from 'react';

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