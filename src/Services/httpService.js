import axios from "axios";

axios.interceptors.response.use(null,error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
    if (error.response.status === 400) {
        alert(error.response.data)
    }

    if (!expectedError) {
        console.error(`Logging Error ${error}`);
        alert("An unexpected error occurred")
    }
    return Promise.reject(error)
    
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}
