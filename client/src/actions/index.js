import axios from 'axios';

export function getTurnos(fecha){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/calendar', {
                params: {fecha}
            });
            console.log(json.data);
            return dispatch({
                type: 'GET_TURNOS',
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    } 
}

export function postClientFromRegister(payload){
    return async function(dispatch){
        const newClient = await axios.post('http://localhost:3001/client', payload);
        console.log(newClient);
        return newClient;
    }
}

// export function postClientFromGoogle(payload){
//     return async function(dispatch){
//         const newGoogleClient = await axios.post('http://localhost:3001/client', payload);
//     }
// }
