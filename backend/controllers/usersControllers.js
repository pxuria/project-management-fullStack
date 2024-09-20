import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/usersModel.js";
import createToken from "../utils/craeteToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = new User({ name, email, password });

  await newUser.save();
  const token = createToken(res, newUser._id);

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    projects: newUser.projects,
    tasks: newUser.tasks,
    token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).populate("projects");

  if (!existingUser) {
    res.status(404);
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await existingUser.matchPassword(password);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  try {
    const token = createToken(res, existingUser._id);

    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      projects: existingUser.projects,
      token,
    });
  } catch (error) {
    res.status(500);
    throw new Error("internal server error.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").populate("projects tasks");
  if (user) {
    res.status(200).json({
      status: "success",
      data: user,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export { createUser, getUserById, loginUser };
