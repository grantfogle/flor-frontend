import { combineReducers } from 'redux';

function flowers(state = [], action) {
    switch (action.type) {
        case 'LOAD_FLOWERS':
            return action.flowers;
        default:
            return state;
    }
}

export default combineReducers({
    flowers
});