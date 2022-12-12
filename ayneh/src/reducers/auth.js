let initialState = {isLogin: false}

export function loginReducer(state=initialState, action) {
    // if( action.payload ){
    //     console.log("reduceeeeer", action.payload)
    // }
    switch (action.type) {
        case  'IS_LOGIN': {
            return {isLogin: true}
        }
        case 'NOT_LOGIN': {
            return {isLogin: false}
        }
        default:
            return state;
    }
}

export function UserReducer(state={}, action) {
    // if( action.payload ){
    //     console.log("reduceeeeer", action.payload)
    // }
    switch (action.type) {
        case  'USER_DATA': {
            return action.payload
        }
        default:
            return state;
    }
}