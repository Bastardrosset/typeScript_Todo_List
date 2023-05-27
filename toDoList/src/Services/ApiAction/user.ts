import { useApi } from "../../hook/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();
// '/api/users'

// Call API BACK-END all users function
export async function getAllUsers(){
    try{
        const readAllUsers = api.get('api/users/')
        return readAllUsers;
        
    } catch(error){
        console.log(error)
    }
}