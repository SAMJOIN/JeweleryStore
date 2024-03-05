let uniqueIds = [];
const reducer = (state, action) => {
    switch (action.type) {
        case 'getItems': {
            let uniqueItems = action.items.filter(item => {
                if (!uniqueIds[item.id]) {
                    uniqueIds[item.id] = true;
                    return true;
                }
                return false;
            });
            return {
                ...state,
                items: [...state.items, ...uniqueItems]
            }
        }
        default:
            return state
    }
}

export default reducer;