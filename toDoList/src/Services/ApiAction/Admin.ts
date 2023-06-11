import { useApi } from "../../hook/useApi"

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi()

// Call API BACK-END delete task ID function for Admin
export async function adminRemoveTask(id: any) {
    try {
        const removeId = api.delete(`api/tasks/delete/${id}`)
        return removeId

    } catch (error) {
        console.log(error)
    }
}

// Call API BACK-END read task ID function
export async function adminEdit(id: any, body: any) {
    try {
        const adminEditTaskId = api.put(`api/tasks/edit/${id}`, body)
        return adminEditTaskId

    } catch (error) {
        console.log(error)
    }
}