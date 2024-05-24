import AxiosDefault from "../../../services/AxiosDefault";
// End Imports

export const userLogin = (credentials) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: "auth/login",
      data: credentials,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const userSignup = (credentials) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: "auth/signup",
      data: credentials,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
