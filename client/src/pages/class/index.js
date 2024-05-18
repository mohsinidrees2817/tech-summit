import Reactm, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, app } from "../../config/firebase";
import { toast } from "react-toastify";
import SearchByid from "./Search";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  onValue,
  ref as dbref,
  push,
  query,
  orderByChild,
  equalTo,
  set,
} from "firebase/database";
const Index = () => {
  const [userData, setUserData] = useState(null);
  const [fileURL, setFileUrl] = useState("");
  const [classesData, setClassesData] = useState([]);
  useEffect(() => {
    let classes = JSON.parse(localStorage.getItem("classes"));

    if (classes) {
      setAllClasses(classes);
      let data = localStorage.getItem("classesdata");
      if (data) {
        setClassesData(JSON.parse(data));
      }
      //   let userdata = SearchByid(id.id);
    }
    let classRoom = classes.filter((item) => item.id === id.id);
    setClassname(classRoom[0].classRoomName);
  }, []);

  const [allClasses, setAllClasses] = useState([]);
  const id = useParams();
  const [classname, setClassname] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [ImageProgress, setImageProgress] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [imageuploaded, setImageUploaded] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);

  const storeFile = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(2);
          setImageProgress(`${progress}%`);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const Adddatatodb = async (url) => {
    try {
      const classData = {
        fileUrl: url,
        classId: id.id,
      };
      push(dbref(db, "classdata"), classData)
        .then(() => {
          // Clear input and update local state
          toast.success("Data added successfully");
          setClassesData([...classesData, classData]);
          localStorage.setItem(
            "classesdata",
            JSON.stringify([...classesData, classData])
          );
        })
        .catch((error) => {
          toast.success("Error adding data: ", error);
        });
      //   setFormData({});
    } catch (error) {
      console.error("Error uploading image and saving form data:", error);
    }
  };

  const handleImageUpload = async (e) => {
    if (selectedFile.length > 0) {
      setUploading(true);
      setImageUploadError(false);
      const file = selectedFile[0]; // Get the first file from the array
      storeFile(file)
        .then((url) => {
          console.log("url", url);
          setImageUploadError(false);
          setUploading(false);
          setImageUploaded(true);
          Adddatatodb(url);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
          console.error("image upload failed", err);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
      console.error("image upoload failed: No file selected");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center py-4 font-bold mx-12 border-b">
        <p className="text-2xl py-2">Class Name: {classname} </p>
        <p className="text-2xl py-2">ID: {id.id}</p>
      </div>
      <div className="flex justify-between items-center py-4 font-bold mx-12  gap-4 ">
        <Link to={`/quiz/${id.id}`}>
          <div className="flex w-full max-w-[200px] bg-black p-4 text-white rounded-sm my-4 items-center justify-center cursor-pointer">
            Take Quiz
          </div>
        </Link>
        <>
          <input
            type="file"
            className="flex w-full max-w-[200px] bg-black p-4 text-white rounded-sm my-4 items-center justify-center cursor-pointer"
            onChange={(e) => setSelectedFile(e.target.files)}
          />
          {selectedFile?.length > 0 && (
            <>
              <div
                className="max-w-[200px] h-[40px] w-full rounded-md p-2 bg-slate-300 border border-[#0c3f16] cursor-pointer"
                onClick={handleImageUpload}
              >
                {uploading ? `Uploading... ${ImageProgress}` : "Upload"}
              </div>
              <p className="text-red-700 text-sm">
                {imageUploadError && imageUploadError}
              </p>
            </>
          )}
        </>
      </div>
      <div className="flex justify-between items-center py-4 font-bold mx-12 flex-col ">
        <p className="text-2xl py-2">Class Content: </p>

        {classesData.map((item, index) => {
          return (
            <div className="flex justify-between items-center w-full border-b p-4 flex-col bg-black/5">
              <Link to={item.fileUrl} target="_blank">
                <p>Content: {index + 1}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Index;
