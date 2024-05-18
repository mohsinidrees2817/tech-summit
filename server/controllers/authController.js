import express from "express";
import User from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newUser, "dfgdfg");

    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, "12");
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true, secure: false })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has been logged out!" });
  } catch (error) {
    next(error);
  }
};

// const update = async (req, res, next) => {
//   try {
//     res.clearCookie("access_token");
//     res.status(200).json({ message: "User has been logged out!" });
//   } catch (error) {
//     next(error);
//   }
// };

const updateUser = async (req, res, next) => {
  console.log("i run");
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, "You can only update your own account!"));
  // try {
  //   const updatedUser = await User.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       $set: {
  //         username: req.body.username,
  //         email: req.body.email,
  //       },
  //     },
  //     { new: true }
  //   );

  //   const { password, ...rest } = updatedUser._doc;

  //   res.status(200).json(rest);
  // } catch (error) {
  //   next(error);
  // }
};

export default {
  signup,
  signin,
  signout,
  updateUser,
};
