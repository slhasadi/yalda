let initialState = []

export function contentReducer(state=initialState, action) {
    switch (action.type) {
        case  'MENU_ITEM': {
            return action.payload
        }
        default:
            return state;
    }
}