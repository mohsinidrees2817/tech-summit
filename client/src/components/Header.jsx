import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setActiveItem } from "../app/reducers/activePage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser, "current user");
  const pages = [
    {
      name: "Signup",
      url: "/signup",
      id: 1,
    },
    {
      name: "Login",
      url: "/signin",
      id: 2,
    },
  ];

  const [pageId, setPageId] = useState(0);
  const activepage = "Home";
  return (
    <div className="text-white bg-[#30AFB8] py-4 font-bold px-4 flex  justify-between">
      <Link to="/">
        <p className="font-bold">Student Portal</p>
      </Link>
      <nav>
        <ul className="flex justify-start items-start   w-full px-2  -mb-[12px] lg:gap-4  z-50  flex-col lg:flex-row   ">
          {currentUser?._id ? (
            <div className="flex justify-center items-center">
              <div className="w-[30px] h-[30px] flex justify-center items-center font-bold bg-white rounded-full text-black/70">
                U
              </div>
              <Link to="/profile">
                <li className=" p-2 relative    group text-[12px] lg:text-[14px]   cursor-pointer">
                  <div className="relative group z-40 ">
                    <div className="flex justify-center items-center  ">
                      <p className=" tracking-wide whitespace-nowrap ">
                        {currentUser.name}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            </div>
          ) : (
            <>
              {pages?.map((item, index) => {
                return (
                  <>
                    <Link to={item?.url}>
                      <li
                        key={index}
                        className={` p-2 relative    group text-[12px] lg:text-[14px]   cursor-pointer ${
                          pageId === item.id
                            ? " text-bold text-black "
                            : `text-[white] hover:text-bold transition-all duration-500 ease-in-out `
                        }`}
                      >
                        <div className="relative group z-40 ">
                          <div
                            className="flex justify-center items-center  "
                            onClick={() => setPageId(index)}
                          >
                            <p className=" tracking-wide whitespace-nowrap ">
                              {item.name}
                            </p>
                            {item.items?.length > 0 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                class="ml-1 -mr-1 h-4 w-4 "
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            )}
                          </div>
                        </div>
                      </li>
                    </Link>
                  </>
                );
              })}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
