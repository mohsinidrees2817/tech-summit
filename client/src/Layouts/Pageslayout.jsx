import React from "react";
import Footer from "../components/Footer";
// import PageIntro from "../components/PageIntro";
const Pageslayout = ({ children, ...props }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "86vh" }}
    >
      {/* {props.pageintro && (
        <PageIntro title={props.title} description={props.description} active= {props.active} />
      )}
      {props.pagetitle && (
        <div className="w-full">
          <div className="flex w-full justify-center py-2 items-center border-[#009932]  border-b-2 bg-[#f5f5f5]">
            <h1 className="text-[24px] w-full text-[#030303] text-center px-2 ">
              {props.pagetitle}
            </h1>{" "}
          </div>
        </div>
      )} */}
      {/* <div className=""> */}
      <div className="flex-grow relative max-w-[1480px] w-full 2xl:mx-auto ">
        {children}
      </div>
      {/* </div> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Pageslayout;
