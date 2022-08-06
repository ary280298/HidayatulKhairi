import { CREATE } from "../actions/type";
const initialState = [];

function reducer(repos = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE:
            return [...repos, payload];
        default:
            return repos;
    }
}
export default reducer;
