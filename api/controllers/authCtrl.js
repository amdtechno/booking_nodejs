import User from "../models/Users.js";
import bcrypt from "bcrypt";
// import { createError } from "../../utils/error.js";
import jwt from "jsonwebtoken";

/// register
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { username, email, password, city, country, mobile,role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const agent = new User({
       ...req.body,
      password: hash,
    });
    await agent.save();

    // You can choose whether to include the password in the response
    res.status(201).json({
      message: "Agent registered successfully",
      // agent: {
      //   name: agent.name,
      //   email: agent.email,
      //   role: agent.role,
      //   // Include the password in the response if needed
      //   password: password,
      // },
    });
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);

    // const newUser = new User({
    //   ...req.body,
    //   password: hash,
    // });
    // await newUser.save();
    // res.status(201).json({ status: "sucess", msg: "User Created Sucessfully" });
  } catch (error) {
    next(error);
  }
};

/// login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));
    const token = jwt.sign(
      { id: user._id, role:user.role },
      process.env.APP_JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ token,...otherDetails });
  } catch (error) {
    next(error);
  }
};
