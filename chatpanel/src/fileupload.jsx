const HandleFileUpload = () => {
   const file = e.target.files[0];
   return (
      <div>
         <input type="file" onChange={HandleFileUpload} />
         <button onClick={HandleFileUpload}>Upload</button>
      </div>
   )
}