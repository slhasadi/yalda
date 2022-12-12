export const Login = (tokens) => ({
    type: 'IS_LOGIN',
    payload: tokens
});

export const Logout = () => ({
    type: 'NOT_LOGIN'
});

export const UserData = (data) => ({
    type: "USER_DATA",
    payload: data
})

export const UpdateMenuItem = (data) => ({
    type: "MENU_ITEM",
    payload: data
})