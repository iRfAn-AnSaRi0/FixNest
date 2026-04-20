import baseApi from "./Api";

const updateProfileApi = (data) => {
    return baseApi.patch("/technician/update-profile", data);
};

export { updateProfileApi }