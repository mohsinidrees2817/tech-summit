import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../app/reducers/userReducer";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch(signInStart());
    console.log(formData, "formdata");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signin",
        formData
        // {
        //   withCredentials: true, // This is equivalent to credentials: 'include'
        // }
      );
      const data = response.data;
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        console.log("Error message:", data.message);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 ">
      <p className="text-3xl ">Sign in</p>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 py-4 w-full max-w-[500px] h-full"
      >
        <input
          type="email"
          placeholder="Enter Password"
          className="border p-3 rounded-lg "
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="border p-3 rounded-lg "
          id="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#2fafb8] p-3 rounded-lg border text-white uppercase hover:opacity-95 cursor-pointer disabled:opacity-80 disbaled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      <div className="flex ">
        <p className="mx-1">Dont have an account? </p>
        <Link to="/signup">
          <span className="text-blue-700 underline">Sign up</span>
        </Link>
      </div>
      {error && (
        <p className="text-red-500 max-w-[500px] p-3 transition-all ease-in-out duration-500 bg-[#f5f5f5] rounded-lg border ">
          {error}
        </p>
      )}
    </div>
  );
};

export default Signin;
