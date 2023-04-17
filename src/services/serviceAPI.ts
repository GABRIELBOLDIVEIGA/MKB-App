

const axiosPost = axios.create({
    baseURL: 'http://localhost/ronney/ronney/public/pages/',
    headers: {
        Accept: 'application/json',
        Content: 'application/json',
        "Content-Type":"multipart/form-data"
    }
})