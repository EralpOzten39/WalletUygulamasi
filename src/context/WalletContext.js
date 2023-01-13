import createContext from './createContext';

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const { Context, Provider } = createContext(
    reducer,
    {},
    { userData: {}, walletData: {}, expenses: {}, histories: {}, categories: {} }
);