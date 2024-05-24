import React from "react";
import { Formik } from "formik";
// End Imports

const Login = () => {
  return (
    <>
      <Formik
        initialState={{
          name: "",
          email: "",
          password: "",
          role: "",
        }}
        onSubmit={(values) => {
          console.log("SignUp-Values :>:>", values);
        }}
      ></Formik>
    </>
  );
};

export default Login;
