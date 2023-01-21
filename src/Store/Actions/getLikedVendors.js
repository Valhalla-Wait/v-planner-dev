import axios from "axios";
import {
    GET_LIKED_VENDORS,
    GET_LIKED_VENDORS_SUCCESS,
    GET_LIKED_VENDORS_FAILED,

} from "../types";

export const getLikedVendors = () =>{
    return (dispatch,getState)=>{
        dispatch(fetchStart);
        const {userInfo} = getState()

        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/matches/liked-vendors`,
            headers: { "Content-Type": "multipart/form-data",Authorization:`Bearer ${userInfo.token}`},
        }).then((res) => {
            console.log("response in liked vendorsJs js",res)
            dispatch(fetchSuccess(res));
        })
            .catch((err) => {
                dispatch(fetchFailed(err.message));
            });
    }
}
const fetchSuccess = (response) => {
    return {
        type: GET_LIKED_VENDORS_SUCCESS,
        payload: {
            data: response.data.result,
        },
    };
};

const fetchStart = () => ({
    type: GET_LIKED_VENDORS,
});

const fetchFailed = (error) => ({
    type: GET_LIKED_VENDORS_FAILED,
    payload: {
        error,
    },
});
