import React from "react";
import { FormInput, Password, Username } from "../Components";
import { SubmitBtn } from "../Components/Buttons";
import { Form, redirect, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosInstance } from "../Utils";
import { toast } from "react-toastify";
import { loginUser } from "../Features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await axiosInstance.post("/auth/local", data);

      store.dispatch(loginUser(response.data));
      toast.success("Loggedin successfully");

      return redirect("/");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error?.message || "Check user details";

      toast.error(errorMsg);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await axiosInstance.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("welcome Guest User");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Guest user login error, Please try again");
    }
  };

  return (
    <>
      <main className="h-screen grid place-items-center">
        {/* <Username />
        <Password /> */}

        <Form
          method="post"
          className="card w-96 py-8 px-8 shadow-lg flex flex-col hap-y-4 bg-[aliceblue] border border-info border-opacity-20 shadow-teal-200"
        >
          <h4 className="text-center text-3xl font-bold">Login</h4>

          <FormInput
            label={"Email"}
            name={"identifier"}
            type={"email"}
            placeHolder={"Please enter your Username"}
            required={true}
          />

          <FormInput
            label={"Password"}
            name={"password"}
            type={"password"}
            placeHolder={"Please enter your Password"}
            required={true}
          />

          <article className="mt-4">
            <SubmitBtn text={"login"} />

            <button
              type="button"
              className="btn btn-neutral btn-block capitalize text-[aliceblue] text-lg"
              onClick={loginAsGuestUser}
            >
              guest user
            </button>

            <p className="text-center mt-6">
              Not a member yet?{" "}
              <Link
                className="ml-2 link link-hover link-primary capitalize"
                to="/register "
              >
                Register
              </Link>
            </p>
          </article>
        </Form>
      </main>
    </>
  );
};

export default Login;
