import baseApi from "./Api";

const updateProfileApi = (data) => {
    return baseApi.patch("/users/update-profile", data);
};

export { updateProfileApi }