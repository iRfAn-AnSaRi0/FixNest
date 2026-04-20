import baseApi from "./Api";

const signup = (data)=>{
    return baseApi.post("/users/register",data);
}

const login = (data)=>{
    return baseApi.post("/users/login",data);
}

export {signup, login};