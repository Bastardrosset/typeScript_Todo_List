import { useApi } from "../../hook/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// Call API BACK-END register function
export async function registerUser(body:any) {
    try{
        const register = api.post('api/auth/register', body )
        return register;
        
    } catch(error) {
        console.log(error)
    }
}

// Call API BACK-END login function
export async function loginUser(body:any) {
    try{
        const login = api.post('api/auth/login', body )
        return login;
        
    } catch(error) {
        console.log('error auth'+error)
    }
}