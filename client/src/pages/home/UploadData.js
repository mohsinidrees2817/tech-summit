// import React, { useState } from "react";
// import { db, app } from "../../config/firebase";
// // import { toast } from "react-toastify";

// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { onValue, ref as dbref, push, set } from "firebase/database";

// const UploadData = () => {
//   const [formData, setFormData] = useState({});
//   const [selectedFile, setSelectedFile] = useState([]);
//   const [imageuploaded, setImageUploaded] = useState(false);
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [ImageProgress, setImageProgress] = useState("");
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (imageuploaded === false) {
//       alert("Please upload image first");
//     } else {
//       Adddatatodb();
//     }
//   };

//   const handleImageSubmit = (e) => {
//     if (selectedFile.length > 0) {
//       setUploading(true);
//       setImageUploadError(false);
//       const file = selectedFile[0]; // Get the first file from the array
//       storeImage(file)
//         .then((url) => {
//           console.log("url", url);
//           setFormData({
//             ...formData,
//             imageUrl: url,
//           });
//           setImageUploadError(false);
//           setUploading(false);
//           setImageUploaded(true);
//           // toast.success("Image Uploaded successfully");
//         })
//         .catch((err) => {
//           setImageUploadError("Image upload failed (2 mb max per image)");
//           setUploading(false);
//           console.error("image upload failed", err);
//         });
//     } else {
//       setImageUploadError("You can only upload 6 images per listing");
//       setUploading(false);
//       console.error("image upoload failed: No file selected");
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (
//             (snapshot.bytesTransferred / snapshot.totalBytes) *
//             100
//           ).toFixed(2);
//           setImageProgress(`${progress}%`);
//           console.log(`Upload is ${progress}% done`);
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const Adddatatodb = async () => {
//     try {
//       const formDataOrdered = {
//         imageUrl: formData.imageUrl,
//         CNIC: formData.CNIC,
//         ApplicantName: formData.ApplicantName,
//         FatherName: formData.FatherName,
//         LicenseNo: formData.LicenseNo,
//         WeaponType: formData.WeaponType,
//         Caliber: formData.Caliber,
//         WeaponNo: formData.WeaponNo,
//         Cartridges: formData.Cartridges,
//         Status: formData.Status,
//         IssueDate: formData.IssueDate,
//         ExpiryDate: formData.ExpiryDate,
//       };
//       push(dbref(db, "licensedata"), formDataOrdered)
//         .then(() => {
//           // Clear input and update local state
//           // toast.success("Data added successfully");
//         })
//         .catch((error) => {
//           // toast.success("Error adding data: ", error);
//         });
//       setFormData({});
//     } catch (error) {
//       console.error("Error uploading image and saving form data:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center flex-col  items-center w-[100vw] min-h-[100vh] bg-gray-300">
//       <img src="/assets/logo.png" alt="" className="w-[200px]" />
//       <p className="font-bold text-xl my-2">Add details</p>
//       <form
//         className="my-4 flex flex-col gap-2 justify-start items-start border-2 p-4 "
//         onSubmit={(e) => handleSubmit(e)}
//       >
//         <label htmlFor="AplicantName" className="text-normal">
//           Aplicant Name:
//           <input
//             type="text"
//             name="ApplicantName"
//             value={formData.ApplicantName || ""}
//             onChange={handleChange}
//             required
//             placeholder="IFTIKHAR AHMAD"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>

//         <label htmlFor="FatherName" className="text-normal">
//           Father Name:
//           <input
//             type="text"
//             name="FatherName"
//             value={formData.FatherName || ""}
//             onChange={handleChange}
//             required
//             placeholder="SULTAN AHMAD"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>
//         <label htmlFor="CNIC" className="text-normal">
//           CNIC Number:
//           <input
//             type="number"
//             name="CNIC"
//             value={formData.CNIC || ""}
//             onChange={handleChange}
//             required
//             minLength="13"
//             maxLength="13"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>

//         <label htmlFor="LicenseNo" className="text-normal">
//           License No.:
//           <input
//             type="text"
//             name="LicenseNo"
//             value={formData.LicenseNo || ""}
//             onChange={handleChange}
//             required
//             placeholder="ID-3943"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>

//         <label htmlFor="WeaponType" className="text-normal">
//           Weapon Type:
//           <input
//             type="text"
//             name="WeaponType"
//             value={formData.WeaponType || ""}
//             onChange={handleChange}
//             placeholder="Pistol"
//             required
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>

//         <label htmlFor="Caliber" className="text-normal">
//           Caliber:
//           <input
//             type="text"
//             name="Caliber"
//             value={formData.Caliber || ""}
//             onChange={handleChange}
//             required
//             placeholder="223 Bore"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>

//         <label htmlFor="WeaponNo" className="text-normal">
//           Weapon No.:
//           <input
//             type="number"
//             name="WeaponNo"
//             value={formData.WeaponNo || ""}
//             onChange={handleChange}
//             required
//             placeholder="604137"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>

//         <label htmlFor="Cartridges" className="text-normal">
//           Cartridges:
//           <input
//             type="number"
//             name="Cartridges"
//             value={formData.Cartridges || ""}
//             onChange={handleChange}
//             required
//             placeholder="200"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>

//         <label htmlFor="Status" className="text-normal">
//           Status:
//           <input
//             type="text"
//             name="Status"
//             value={formData.Status || ""}
//             onChange={handleChange}
//             required
//             placeholder="All Pakistan"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>

//         <label htmlFor="IssueDate" className="text-normal">
//           Issue date:
//           <input
//             type="date"
//             name="IssueDate"
//             value={formData.IssueDate || ""}
//             onChange={handleChange}
//             required
//             placeholder="03-02-2024"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>

//         <label htmlFor="ExpiryDate" className="text-normal">
//           Expiry date:
//           <input
//             type="date"
//             name="ExpiryDate"
//             value={formData.ExpiryDate || ""}
//             onChange={handleChange}
//             required
//             placeholder="31-12-2028"
//             className="px-4 py-2 min-w-[350px] rounded-md bg-transparent border border-[#0c3f16] focus:outline-none focus:border-blue-500"
//           />
//         </label>
//         <div className="flex jusitfy-start items-end gap-2 flex-col">
//           {formData.imageUrl ? (
//             <img src={formData.imageUrl} alt="" className="w-[200px]" />
//           ) : (
//             <>
//               <label htmlFor="ExpiryDate" className="text-normal">
//                 Upload Image:
//                 <input
//                   type="file"
//                   onChange={(e) => setSelectedFile(e.target.files)}
//                   required
//                   accept="image/*"
//                   className="border p-3 rounded-lg"
//                 />
//               </label>
//               {selectedFile?.length > 0 && (
//                 <>
//                   <div
//                     className="max-w-[200px] h-[40px] w-full rounded-md p-2 bg-slate-300 border border-[#0c3f16] cursor-pointer"
//                     onClick={handleImageSubmit}
//                   >
//                     {uploading ? `Uploading... ${ImageProgress}` : "Upload"}
//                   </div>
//                   <p className="text-red-700 text-sm">
//                     {imageUploadError && imageUploadError}
//                   </p>
//                 </>
//               )}
//             </>
//           )}
//         </div>
//         <button
//           type="submit"
//           className="max-w-[120px] w-full rounded-md p-2 bg-slate-300 border border-[#0c3f16]"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadData;
