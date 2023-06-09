import { useApi } from "../../hook/useApi"

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi()


// Call API BACK-END create task function
export async function createTask(body: any) {
    try {
        const create = api.post('api/tasks/create', body)
        return create

    } catch (error) {
        console.log(error)
    }
}

// Call API BACK-END read all task function
export async function readAllTask() {
    try {
        const readAll = api.get('api/tasks/read')
        return readAll

    } catch (error) {
        console.log(error)
    }
}

// Call API BACK-END read task ID function
export async function readTask(id: any) {
    try {
        const readTaskId = api.get(`api/tasks/read/${id}`)
        return readTaskId

    } catch (error) {
        console.log(error)
    }
}

// Call API BACK-END read task ID function
export async function editStatus(id: any, body: any) {
    try {
        const editStatusId = api.put(`api/tasks/edit/${id}`, body)
        return editStatusId

    } catch (error) {
        console.log(error)
    }
}

// Call API BACK-END delete task ID function for Admin
export async function adminRemoveTask(id: any) {
    try {
        const removeId = api.delete(`api/tasks/delete/${id}`)
        return removeId

    } catch (error) {
        console.log(error)
    }
}