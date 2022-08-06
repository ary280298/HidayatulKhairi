

import { CREATE } from "./type";

export const create = (data) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE,
            payload: data,
        });
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};
