"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signUpSchema } from "../schemas/validationSchema";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingIcon from "../components/LoadingIcon";
import Link from "next/link";


const SignUpPage = () => {
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true)
    const handleShow = () => {
        setShow(!show);
    };

    const initialValues = {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: async (values, actions) => {
            setLoading(false)
            try {
                const response = await axios.post("/api/users/signUp", values);
                if (response.data.success) {
                    toast.success(response.data.message);
                    router.push('/')
                } else {
                    toast.error(response.data.message);
                }
                setLoading(true)
                actions.resetForm();
            } catch (error: any) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        },
    });
    return (
        <div className='flex items-center justify-center  h-full '>
            <div className='bg-gray-800 p-3 rounded-xl md:space-y-4 w-[500px]'>
                <div className='md:p-3'>
                    <h2 className='text-xl md:text-4xl text-center'>SignUp</h2>
                </div>
                <div className='p-2'>
                    <form onSubmit={handleSubmit} className='grid gap-3 md:gap-5 ' >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div>
                                <label htmlFor="userName" className='text-sm md:text-sm'>Name</label>
                                <input type="text" className='w-full outline-none text-black p-1 md:p-2 text-sm font-bold rounded-md md:rounded-3xl'
                                    id="userName"
                                    value={values.userName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="text-red-600 text-sm h-3 md:h-5 block">
                                    {errors.userName && touched.userName ? errors.userName : ""}
                                </span>
                            </div >
                            <div >
                                <label htmlFor="email" className='text-sm md:text-sm'>Email</label>
                                <input type="email" className='w-full outline-none text-black p-1 md:p-2 text-sm font-bold  rounded-md md:rounded-full'
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="text-red-600 text-sm h-3 md:h-5 block">
                                    {errors.email && touched.email ? errors.email : ""}
                                </span>
                            </div>
                            <div >
                                <label htmlFor="password" className='text-sm md:text-sm'>Password</label>
                                <div className='flex bg-white items-center w-full outline-none text-black p-1 md:p-2 text-sm font-bold  rounded-md md:rounded-full'>
                                    <input type={show ? 'text' : 'password'} className='w-full outline-none text-black'
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    <div onClick={handleShow} className='cursor-pointer'>
                                        {!show ? <FaEye /> : <FaEyeSlash />}
                                    </div>
                                </div>
                                <span className="text-red-600 text-sm h-3 md:h-5 block">
                                    {errors.password && touched.password ? errors.password : ""}
                                </span>
                            </div>
                            <div >
                                <label htmlFor="confirmPassword" className='text-sm md:text-sm'>Confirm Password</label>
                                <div className='flex bg-white items-center w-full outline-none text-black p-1 md:p-2 text-sm font-bold  rounded-md md:rounded-full'>
                                    <input type={show ? 'text' : 'password'} className='w-full outline-none text-black'
                                        id="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div onClick={handleShow}>
                                        {!show ? <FaEye /> : <FaEyeSlash />}
                                    </div>
                                </div>
                                <span className="text-red-600 text-sm h-3 md:h-5 block">
                                    {errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
                                </span>
                            </div>
                        </div>
                        <div className='space-y-1 md:space-y-3'>
                            <div className=' space-y-1'>
                                <button type={loading ? "submit" : "button"} className='bg-gray-600 w-full p-2 text-center transition duration-300 hover:bg-gray-900 rounded-md px-4'>
                                    {loading ? "Register" : <span className="flex justify-center"><LoadingIcon /></span>}
                                </button>
                                <p className='text-center text-sm'>Already have an account <span className='underline transition duration-300 hover:text-blue-700'><Link href="/login">Click here</Link></span> </p>
                            </div>
                            <p className='text-center'>Or</p>
                            <hr />
                            <div className="flex items-center justify-center w-full cursor-pointer py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-gray-600 hover:bg-gray-900">
                                <img className="h-3 md:h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="" />
                                Sign in with Google
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default SignUpPage