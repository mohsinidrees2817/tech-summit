import React, { useEffect } from "react";
import Pageslayout from "../../Layouts/Pageslayout";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Index = ({ title, description }) => {
  const navigate = useNavigate();
  const favouriteproduct = useSelector((state) => state.favouriteproduct);
  console.log(favouriteproduct, "favouriteproduct");
  return (
    <Pageslayout
      title="Searched results"
      description="Properties related to your search"
      active="true"
    >
      svsvscsc
    </Pageslayout>
  );
};
export default Index;
