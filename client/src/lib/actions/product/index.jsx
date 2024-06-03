import AxiosDefault from "../../../services/AxiosDefault";
// End Imports
export const productCreate = (values) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: "products/create",
      data: values,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
