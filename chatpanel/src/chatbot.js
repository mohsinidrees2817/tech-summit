const axios = require("axios");
const FormData = require("form-data");


export const QueryChatbot = async (file) => {
    const formData = new FormData();
    formData.append(
      "file",
      file
    );
    
    const options = {
      headers: {
        "x-api-key": "sec_myMrf1KA7zmLinEJyxtO9fyD74NozN2n",
        ...formData.getHeaders(),
      },
    };
    
    axios
      .post("https://api.chatpdf.com/v1/sources/add-file", formData, options)
      .then((response) => {
        console.log("Source ID:", response.data.sourceId);
      })
      .catch((error) => {
        console.log("Error:", error.message);
        console.log("Response:", error.response.data);
      });
}


