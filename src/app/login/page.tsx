'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { loginSchema } from '../schemas/validationSchema';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoadingIcon from '../components/LoadingIcon';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const handleShow = () => {
        setShow(!show);
    };

    const initialValues = {
        email: "",
        password: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, actions) => {
            setLoading(true)
            try {
                console.log(values, '----------values')
                const response = await axios.post("/api/users/login", values);
                if (response.data.success) {
                    toast.success(response.data.message);
                    router.push('/')
                } else {
                    toast.error(response.data.message);
                }
                setLoading(false)
                actions.resetForm();
            } catch (error: any) {
                setLoading(false)
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        },
    });
    return (
        <div className='flex items-center justify-center  h-full '>
            <div className='bg-gray-800 p-3 rounded-xl md:space-y-4 w-[500px]'>
                <div className='md:p-3'>
                    <h2 className='text-4xl text-center'>Login</h2>
                </div>
                <div className='p-2'>
                    <form onSubmit={handleSubmit} className='grid gap-5 ' >
                        <div className='grid grid-cols-1 gap-2'>

                            <div >
                                <label htmlFor="email" className='text-sm md:text-sm'>Email</label>
                                <input type="email" className='w-full outline-none text-black p-1 md:p-2 text-sm font-bold  rounded-md md:rounded-full'
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="text-red-600 text-sm h-5 block">
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
                                <span className="text-red-600 text-sm h-5 block">
                                    {errors.password && touched.password ? errors.password : ""}
                                </span>
                            </div>
                        </div>
                        <div className='space-y-1 md:space-y-3'>
                            <div className='space-y-1'>
                                <button type={!loading ? "submit" : "button"} className='bg-gray-600 w-full p-2 text-center transition duration-300 hover:bg-gray-900 rounded-md px-4'>
                                    {!loading ? "Login" : <span className="flex justify-center"><LoadingIcon /></span>}
                                </button>
                                <p className='text-center text-sm'>Need an account <span className='underline transition duration-300 hover:text-blue-700'><Link href="/signUp">Click here</Link></span> </p>
                            </div>
                            <p className='text-center'>Or</p>
                            <hr />
                            <div className="flex items-center justify-center w-full cursor-pointer py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-gray-600 hover:bg-gray-900">
                                <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="" />
                                Sign in with Google
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default LoginPage