import baseApi from "./Api"

const getCategory = () => {
    return baseApi.get("/categories/category")
}

export { getCategory }