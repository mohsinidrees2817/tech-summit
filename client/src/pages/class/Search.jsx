import React from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, app } from "../../config/firebase";

import {
  onValue,
  ref as dbref,
  push,
  query,
  orderByChild,
  equalTo,
  set,
} from "firebase/database";
const SearchByid = async (id) => {
  console.log(id, "id");
  return new Promise((resolve, reject) => {
    const queryRef = query(
      ref(db, "classdata"),
      orderByChild("classId"),
      equalTo(id)
    );

    onValue(
      queryRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userDataArray = Object.values(userData);
          resolve(userDataArray);
          console.log("User data:", userDataArray[0]);
          //   setUserData(userDataArray[0]);
          return userDataArray;
        } else {
          resolve(null);
          console.log("No data found for id:", id);
          alert("No data found for id:", id);
        }
      },
      (error) => {
        reject(error);
        console.log("Error fetching data:", error);
      }
    );
  });
};
export default SearchByid;
