"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect} from "react";
import css from "../signin/page.module.css";
// import { FiLock } from 'react-icons/fa';
import { FiLock } from "react-icons/fi";
import {
  emailValidator,
  emptyStringValidator,
  passwordLengthValidator,
} from "../../../../validators/validator";
import Script from "next/script";
import Head from "next/head";
import axios from "axios";
import {compareSync, genSaltSync, hashSync} from 'bcryptjs'
import { useRouter } from "next/navigation";

// cspell:ignore Signup,Signin
const initialValues = {
  email: "",
  // email: "",
  password: "",
};

export default function Signup() {
  const router = useRouter();
  const [signupValues, setSignupValues] = useState(initialValues);
  const [showSnackBar, setShowSnackBar] = useState({
    isOpen: false,
    message: "",
    isError: false,
  });


  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email')
    if(storedEmail && storedEmail.length !== 0) router.push('/listing')
  
    return () => {
      
    }
  }, [router])
  


  const handleChange = (ev) => {
    setSignupValues({ ...signupValues, [ev.target.name]: ev.target.value });
  };

  useEffect(() => {
    if (showSnackBar?.isOpen) {
      setTimeout(() => {
        setShowSnackBar({
          isOpen: false,
          isError: false,
          message: "",
        });
      }, 4000);
      clearTimeout();
    }

    return () => {};
  }, [showSnackBar?.isOpen]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !emptyStringValidator(signupValues?.email) ||
      !emptyStringValidator(signupValues?.password)
    ) {
      setShowSnackBar({
        isOpen: true,
        isError: true,
        message: "Please Enter All The Details",
      });
      return;
    }

    if (!emailValidator(signupValues?.email)) {
      setShowSnackBar({
        isOpen: true,
        isError: true,
        message: "Please Enter a Valid Email",
      });
      return;
    }

    try {

      const res = await axios.post("/api/signin", {
        email: signupValues?.email,
        password: signupValues?.password,
      });
      if (res.data.statusCode === 200) {
        const passwordHash = res.data.userData.password;
        const correctPassword = compareSync(
          signupValues.password, passwordHash
        );
        if(correctPassword){
          setShowSnackBar({
            isOpen: true,
            isError: false,
            message: 'Logged In Successfully',
          });
          sessionStorage.setItem('email', res.data.userData.email)
          router.push('/listing');
          
        }
        else{
          setShowSnackBar({
            isOpen: true,
            isError: true,
            message: 'Invalid Password',
          });
        }
        console.log(correctPassword)
      } else {
        setShowSnackBar({
          isOpen: true,
          isError: true,
          message: res.data.responseText,
        });
      }
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-[100vh] w-full">
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css"
          rel="stylesheet"
        />
      </Head>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"
        async="lazyOnload"
      ></script>
      <div className="grid custom640:grid-cols-1 grid-cols-5">
        <div className="custom640:hidden bg-[#fff] min-h-[100vh] flex items-center col-span-3">
          <Image
            className="m-auto"
            src="/illustration_login.png"
            alt="Sign in"
            width={480}
            height={360}
            priority
          />
        </div>

        <div className="col-span-2 bg-[#ffffff] custom640:min-h-[100vh] drop-shadow-2xl">
          <div className=" flex flex-col items-center gap-1 custom640:pt-[50px] pt-[100px] mb-[20px]">
            <div className="bg-purple-900 rounded-full w-[50px] h-[50px] flex justify-center items-center">
              <FiLock size="1.8em" color="#fff" className="" />
            </div>
            <h1 className="text-[black] text-[50px] custom640:text-[30px] font-medium custom640:text-center">
              Sign In
            </h1>

            {showSnackBar?.isError ? (
              <div
                id="toast-danger"
                className={`${
                  showSnackBar?.isOpen ? "flex" : "hidden"
                } items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Error icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">
                  {showSnackBar.message}
                </div>
                <button
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-danger"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : (
              <div
                id="toast-success"
                className={`${
                  showSnackBar?.isOpen ? "flex" : "hidden"
                } items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">
                  {showSnackBar.message}
                </div>
                <button
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-success"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
          </div>

          <form className="px-[35px]">
            <div className="mb-6">
              <label
                htmlFor="large-input-email"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Email*
              </label>

              <input
                value={signupValues.email}
                onChange={handleChange}
                name="email"
                autoComplete="false"
                required
                placeholder="email"
                type="email"
                id="large-input-email"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* <div className="mb-6">
              <label
                htmlFor="large-input-email"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Email Address*
              </label>

              <input
                value={signupValues.email}
                onChange={handleChange}
                name="email"
                autoComplete="false"
                required
                placeholder="email"
                type="email"
                id="large-input-email"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div> */}
            <div className="mb-6">
              <label
                htmlFor="large-input-password"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Password*
              </label>

              <input
                value={signupValues.password}
                onChange={handleChange}
                name="password"
                autoComplete="false"
                required
                placeholder="password"
                type="password"
                id="large-input-password"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-[1.2em] py-[25px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Sign In
            </button>
          </form>

          <div
            className="flex custom640:flex-col custom640:gap-5 custom640:px-[20px] custom640:text-center       
          custom950:flex-col custom950:gap-5 custom950:px-[20px] custom950:text-center
          item-center justify-between px-[60px] mt-[25px]"
          >
            <p className="text-[blue] hover:underline mr-[10px]">
              <Link href="*">Forget Password?</Link>
            </p>
            <p className="text-[blue] hover:underline">
              <Link href="/signup">Don&lsquo;t have an Account? Sign In.</Link>
            </p>
          </div>

          <p className="text-[gray] text-center mt-[60px] mb-[30px]">
            Copyright &#169;{" "}
            <span className="hover:underline">Your Website</span> 2023
          </p>
        </div>
      </div>
    </div>
  );
}
