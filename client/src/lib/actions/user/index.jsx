import AxiosDefault from "../../../services/AxiosDefault";
// End Imports

// Begin API Call Functions
export const getUserDataAPI = ({ userId }) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "GET",
      url: `user/${userId}`,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const updateUserDataAPI = ({ userId, values }) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "PUT",
      url: `user/${userId}`,
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
export const deleteUserAPI = ({ userId }) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "DELETE",
      url: `user/${userId}`,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Address API's
export const addAddressAPI = (values) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: "user/address",
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
      url: `user/address/${userId}`,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const setDefaultAddressAPI = (values) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: `user/default-address`,
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

export const deleteAddressAPI = ({userId,addressId}) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "DELETE",
      url: `user/${userId}/${addressId}`,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
