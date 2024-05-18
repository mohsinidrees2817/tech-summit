import express from "express";
import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
// const signup = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = bcrypt.hashSync(password, 12);
//     const newAdmin = await Admin.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     console.log(newAdmin, "dfgdfg");

//     await newAdmin.save();
//     res.status(201).json({ message: "Admin created successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) return next(errorHandler(404, "Admin not found!"));
    const validPassword = bcrypt.compareSync(password, validAdmin.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validAdmin._doc;
    res.cookie("access_token", token, { secure: false }).status(200).json(rest);

    // res.cookie("access_token", token, { secure: false }).status(200).json({
    //   success: true,
    //   user
    // });
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Admin has been logged out!" });
  } catch (error) {
    next(error);
  }
};

export default {
  //   signup,
  signin,
  signout,
};
