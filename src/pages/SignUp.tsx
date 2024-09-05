import { Link } from "react-router-dom";
import React, { useState } from "react";
import { IUser } from "../context/UserProvider.tsx";
import { createAuthUserWithEmailAndPassword } from "../firebase/firebase.tsx";
import classNames from "classnames";
import lock from "../assets/icon-password.svg";
import envelope from "../assets/icon-email.svg";

interface SignUpFormProps {
  onSignUpSuccess: (user: IUser | null) => void;
}

const defaultFormField = {
  email: "",
  password: "",
};

export default function SignUp({ onSignUpSuccess }: SignUpFormProps) {
  const [formFields, setFormFields] = useState(defaultFormField);
  const [isError, setIsError] = useState(false);

  const { email, password } = formFields;

  const onInputFormHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    setIsError(false);
  };

  const onSignUp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (password === "" || email === "") {
      setIsError(true);
      return;
    }

    try {
      const authUser = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const user = authUser?.user;
      if (!user) return;

      setFormFields(defaultFormField);

      onSignUpSuccess(user as unknown as IUser);
    } catch (error) {
      console.log("user creation encountered an error", error);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <div className="relative">
                  {isError && (
                    <div className="absolute text-sm text-red-500 right-2 top-2.5">
                      Can't be empty
                    </div>
                  )}
                  <input
                    onChange={onInputFormHandle}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    className={classNames(
                      "bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full py-2.5 pl-9 ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-purple",
                      {
                        "ring-1 outline-none ring-red-500": isError,
                      }
                    )}
                    placeholder="name@company.com"
                  />
                  <img
                    className="absolute top-3 left-2"
                    src={envelope}
                    alt="email"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <div className="relative">
                  {isError && (
                    <div className="absolute text-sm text-red-500 right-2 top-2.5">
                      Please check again
                    </div>
                  )}
                  <input
                    onChange={onInputFormHandle}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className={classNames(
                      "bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full py-2.5 pl-9 ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-purple",
                      {
                        "ring-1 outline-none ring-red-400": isError,
                      }
                    )}
                  />
                  <img
                    className="absolute top-3 left-2"
                    src={lock}
                    alt="lock"
                  />
                </div>
              </div>
              <button
                onClick={onSignUp}
                type="submit"
                className="w-full text-white bg-purple hover:bg-purple-light hover:text-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="flex justify-center text-sm font-light text-gray-500">
                <span className="pr-2">Already have an account?</span>
                <Link to="/" className="font-sm text-purple hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
