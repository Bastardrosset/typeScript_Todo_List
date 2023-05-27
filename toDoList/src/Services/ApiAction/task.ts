import { useApi } from "../../hook/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();


// Call API BACK-END create task function
export async function createTask(body:any){
    try{
        const create = api.post('api/tasks/create', body)
        return create;
        
    } catch(error){
        console.log(error)
    }
}

// Call API BACK-END read all task function
export async function readAllTask(){
    try{
        const readAll = api.get('api/tasks/read')
        return readAll;

    } catch(error){
        console.log(error)
    }
}