import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4500",
    headers: {
        Accept: "application/json",
        Content: "application/json",
    },
});

API.interceptors.response.use(function (config) {
    // console.log(config.data);

    return config;
});

API.interceptors.request.use(
    function (config) {
        // console.log(config);

        return config;
    },
    function (error) {
        alert(error);
        return Promise.reject(error);
    }
);


export default API;
