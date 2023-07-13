import {usersActions} from "@reducers"
import axios from "axios";

export const fetchUsers = () => (dispatch) => {
    const {userFetching} = usersActions
    dispatch(userFetching({isLoading: true}))

    return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(({data}) => dispatch(userFetching({isLoading: false, users: data})))
        .catch(e => userFetching({isLoading: false, isError: true}));
}