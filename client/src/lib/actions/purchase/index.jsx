import AxiosDefault from "../../../services/AxiosDefault";
// End Imports

export const addToCartAPI = (values) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: `cart/add_to_cart`,
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
export const getCartAPI = ({ userId }) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "GET",
      url: `cart/${userId}`,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const orderCheckoutAPI = (values) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: `checkout`,
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

export const webhookAPI = (values) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: `webhook`,
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
