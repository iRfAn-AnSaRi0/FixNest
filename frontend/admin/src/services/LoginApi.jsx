import baseApi from "./Api";

const login = (data) => {
    return baseApi.post("/login", data)
}

export { login }