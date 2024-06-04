import AxiosDefault from "../../../services/AxiosDefault";
// End Imports
export const imageUpload = (values) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: "upload",
      data: values,
      headers: {
        "Content-Type": "multipart/form-data",
      }  
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
