'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
    const [userId, setUserId] = useState()

    const handleLogOut = async () => {
        const res = await axios.get('/api/users/logout')
        console.log(res, '------------res')
        toast.success(res.data.message);
    }
    useEffect(() => {
        const userData = async () => {
            const res = await axios.get('/api/users/me')
            console.log(res.data.data._id, '--------res')
            setUserId(res.data.data._id)
        }
        userData()
    }, [])

    return (
        <div className='h-screen grid place-items-center'>
            <Link href={`/profile/${userId}`}>  <p>{userId}</p></Link>
            <button className='bg-yellow-600 p-2' onClick={handleLogOut}>LOgout</button>
        </div>
    )
}

export default page