import AxiosDefault from "../../../services/AxiosDefault";
// End Dependencies

export const addAddressAPI = (values) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: "addresses",
      data: values,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAddressAPI = ({ userId }) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "GET",
      url: `addresses/${userId}`,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
