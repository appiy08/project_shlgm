import { get } from "lodash";
import AxiosDefault from "../../../services/AxiosDefault";
// End Imports

export const productsGet = (params) => {
  return new Promise((resolve, reject) => {
    var URL = "";
    if (get(params, "category", "")) {
      URL = `products?category="${get(params, "category", "")}"`;
    } else if (get(params, "brand", "")) {
      URL = `products?category="${get(params, "brand", "")}"`;
    } else if (
      get(params, "category", "") !== "" &&
      get(params, "brand", "") !== ""
    ) {
      URL = `products?category="${get(params, "category", "")}"&brand="${get(
        params,
        "brand",
        ""
      )}"`;
    } else {
      URL = `products`;
    }

    AxiosDefault({
      method: "GET",
      url: URL,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

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
