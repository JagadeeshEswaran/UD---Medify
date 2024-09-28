import React from "react";
import { Form, redirect } from "react-router-dom";
import { FormInput } from "../Components";
import { SubmitBtn } from "../Components/Buttons";
import { Link } from "react-router-dom";
import { axiosInstance } from "../Utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // console.log("data : ", data);

  try {
    const response = await axiosInstance.post("/auth/local/register", data);
    toast.success("Account created successfully");
    return redirect("/login");
  } catch (error) {
    const errorMsg =
      error?.response?.data?.error?.message || "Check your details";

    toast.error(errorMsg);
    return null;
  }
};

const Register = () => {
  return (
    <>
      <main className="h-screen grid place-items-center">
        {/* <Username />
        <Password /> */}

        <Form
          method="post"
          className="card w-96 py-8 px-8 shadow-lg flex flex-col gap-y-4 bg-[aliceblue] border border-info border-opacity-20 shadow-teal-200"
        >
          <h4 className="text-center text-3xl font-bold">Let's Sign Up</h4>

          <FormInput
            label={"Your Name"}
            name={"username"}
            type={"text"}
            placeHolder={"Please enter your Username"}
          />

          <FormInput
            label={"Email"}
            name={"email"}
            type={"email"}
            placeHolder={"Please enter your Username"}
          />

          <FormInput
            label={"Password"}
            name={"password"}
            type={"password"}
            placeHolder={"Please enter your Password"}
          />

          <article className="mt-4">
            <SubmitBtn text={"Create Account"} />

            {/* <button
              type="button"
              className="btn btn-neutral btn-block capitalize text-[aliceblue] text-lg"
            >
              guest user
            </button> */}

            <p className="text-center mt-6">
              Already a member?{" "}
              <Link
                className="ml-2 link link-hover link-primary capitalize"
                to="/login"
              >
                Signin
              </Link>
            </p>
          </article>
        </Form>
      </main>
    </>
  );
};

export default Register;
