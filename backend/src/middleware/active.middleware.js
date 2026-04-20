import { User } from "../models/user.model.js";

const updateUserActivity = async (req, res, next) => {

  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, {
      lastActiveAt: new Date()
    });
  }

  next();
};

export { updateUserActivity };