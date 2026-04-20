import baseApi from "./Api";

const signupVerifyOtp = (data) => {
    return baseApi.post("/users/verify-otp", data)
}

const loginVerifyOtp = (data) => {
    return baseApi.post("/users/verify-login-otp", data)
}

const reSendOtp = (data) => {
    return baseApi.post("/users/resend-otp", data)
}


export { signupVerifyOtp, loginVerifyOtp, reSendOtp }