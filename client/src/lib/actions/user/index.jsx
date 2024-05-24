import AxiosDefault from "../../../../services/AxiosDefault";
// End Imports
// Begin API Call Functions 
export const getUserData = (credentials) => {
  return new Promise((resolve, reject) => {
    AxiosDefault({
      method: "POST",
      url: "user/user",
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
