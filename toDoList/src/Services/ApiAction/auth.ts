import { useApi } from "../../hook/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

export async function registerUser() {
    try{
        const register = api.post('api/auth/register')
        return register;
        
    } catch(error) {
        console.log(error)
    }
}