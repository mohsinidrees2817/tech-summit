import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData, "formdata");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData
      );
      const data = response.data;
      if (data.success == false) {
        setError(data.message);
        console.log("Error message:", data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4">
      <p className="text-3xl ">Sign up</p>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 py-4 w-full max-w-[500px]"
      >
        <input
          type="text"
          placeholder="Enter Name"
          className="border p-3 rounded-lg "
          id="name"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <div className="flex ">
        <p className="mx-1">Have an Account? </p>
        <Link to="/signin">
          <span className="text-blue-700 underline">Sign in</span>
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

export default Signup;
