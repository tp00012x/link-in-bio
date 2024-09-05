import { Link } from "react-router-dom";
import { IUser } from "../context/UserProvider.tsx";
import React, { useState } from "react";
import { signInWithPassword } from "../firebase/firebase.tsx";
import lock from "../assets/icon-password.svg";
import envelope from "../assets/icon-email.svg";
import classNames from "classnames";

const defaultFormField = {
  email: "",
  password: "",
};

interface ISignInProps {
  onSignInSuccess: (user: IUser | null) => void;
}

export default function SignIn({ onSignInSuccess }: ISignInProps) {
  const [isError, setIsError] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const onInputFormHandle = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormFields({ ...formFields, [name]: value });
    setIsError(false);
  };

  const onSignIn = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (password === "" || email === "") {
      setIsError(true);
      return;
    }

    try {
      const userCredential = await signInWithPassword(email, password);
      setFormFields(defaultFormField);
      onSignInSuccess(userCredential.user as unknown as IUser);
    } catch (error) {
      console.log("user creation encountered an error", error);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-orange md:text-2xl">
              Log In
            </h1>
            <form className="space-y-4 md:space-y-6" action="src/routers#">
              <div>
                <label
                  htmlFor="email"
                  className={classNames(
                    "block mb-2 text-sm font-medium text-gray-900",
                    {
                      "text-red-400": isError,
                    }
                  )}
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
                  className={classNames(
                    "block mb-2 text-sm font-medium text-gray-900",
                    {
                      "text-red-400": isError,
                    }
                  )}
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
              <div className="flex flex-col">
                <div className="pb-5">
                  <button
                    onClick={onSignIn}
                    type="submit"
                    className="w-full text-white bg-purple hover:bg-purple-light hover:text-purple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Log In with Email
                  </button>
                </div>
              </div>

              <p className="flex justify-center text-sm font-light text-gray-500">
                <span className="pr-2">Don't have an account? </span>
                <Link
                  to="/signup"
                  className="font-sm text-purple hover:underline"
                >
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
