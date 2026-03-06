import { User } from "../models/user.model.js"
import { ApiError } from "../utils/api.error.js"


const checkBlockedPhone = async (phone) => {

    const checkUser = await User.findOne({ phone, status: "blocked" })

    if (checkUser) {
        throw new ApiError(403, "The phone number has been blocked")
    }
}

export { checkBlockedPhone };