import React, { useEffect, useState } from "react";
// import UploadData from "./UploadData";
import { Link } from "react-router-dom";
const Index = () => {
  useEffect(() => {
    let classes = JSON.parse(localStorage.getItem("classes"));
    if (classes) {
      setAllClasses(classes);
    }
  }, []);
  const [classRoomName, setClassRoomName] = useState("");
  const [AllClasses, setAllClasses] = useState([]);
  const OnSubmit = async (e) => {
    e.preventDefault();
    let classes = {
      classRoomName,
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    };
    console.log(classes, "classes");
    setAllClasses([...AllClasses, classes]);
    console.log(AllClasses);
    localStorage.setItem("classes", JSON.stringify([...AllClasses, classes]));
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-[30vh] border-b">
        <p className="py-4 font-bold text-3xl ">Welcome to Portal</p>
      </div>

      <div className="flex justify-center items-center flex-col">
        <p className="text-center font-bold py-4">Class Rooms</p>
        <div className="flex justify-center  items-center w-full flex-wrap gap-12 mx-12">
          {AllClasses?.map((item, index) => {
            return (
              <Link to={`/class/${item.id}`}>
                <div className="border-2 h-[100px] p-4 bg-black/20 w-[100px] flex justify-center items-center overflow-hidden">
                  {item.classRoomName}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <form
        className="flex justify-center items-center my-4 flex-col"
        onSubmit={OnSubmit}
      >
        <input
          required
          type="text"
          className="bg-transparent p-4 border-2   min-w-[300px] my-2 "
          placeholder="Enter Class Name"
          onChange={(e) => setClassRoomName(e.target.value)}
        />
        <button className="p-2 bg-[#2fafb8] rounded-sm" type="submit">
          Create Classroom
        </button>
      </form>
    </>
  );
};

export default Index;
