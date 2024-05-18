import { current } from "@reduxjs/toolkit";
import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../../app/reducers/userReducer";
import { useDispatch } from "react-redux";

const Index = () => {
  const dispatch = useDispatch();
  const { avatar, currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const response = await axios.get(
        "http://localhost:4000/api/auth/signout"
      );
      const data = response.data;

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(
        `http://localhost:4000/api/auth/update/${currentUser?._id}`,
        formData
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="max-w-[500px] mx-auto px-2">
      <h1 className="text-3xl font-semibold text-center my-7">User Profile</h1>
      <form
        action="
      "
        className="flex flex-col gap-4 max-w-[500px] justify-center items-center w-full mx-auto"
      >
        <input type="file" ref={fileRef} hidden accept="image/*" />

        <input
          type="text"
          placeholder="Name"
          id="username"
          defaultValue={currentUser?.name}
          onChange={handleChange}
          className="p-3 rounded-lg w-full"
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser?.email}
          className="p-3 rounded-lg w-full"
          onChange={handleChange}
        />

        <button
          className="bg-[#2fafb8]  text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80 w-full"
          onClick={handleSubmit}
        >
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Signout
        </span>
      </div>
    </div>
  );
};
export default Index;
