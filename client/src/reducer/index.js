const initialState = {
    turnos: [],
    clientes: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_TURNOS':
            return {
                ...state,
                turnos: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;