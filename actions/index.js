export const LOAD_FLOWERS = 'LOAD_FLOWERS';
export function loadFlowers() {
    return async (dispatch) => {
        const response = await fetch('https://flor-backend.herokuapp.com/');
        const json = await response.json()
        console.log(json)
        dispatch({
            type: LOAD_FLOWERS,
            flowers: json
        })
    }
}