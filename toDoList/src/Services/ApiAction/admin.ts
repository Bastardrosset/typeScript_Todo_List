import { useApi } from "../../hook/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

export async function isAdmin() {
    try{
        const response = api.get('api/users/')
        const users = (await response).data;

    const adminUsers = users.filter((user: { isAdmin: string }) => user.isAdmin === 'Admin');
    return adminUsers;
    } catch(error) {
        console.log(error)
    }
}