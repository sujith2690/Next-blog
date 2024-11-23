import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { CiPhone } from 'react-icons/ci';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5';
import { MdNavigateNext } from 'react-icons/md';
const company = [
    { name: 'Homepage', path: '/' },
    { name: 'New Blogs', path: '/new-blog' },
    { name: 'My Blogs', path: '/my-blog' },
    { name: 'Add Blog', path: '/addBlog' },
];
const support = [
    { name: 'Help Center', path: '/#' },
    { name: 'Privacy Policy', path: '/#' },
    { name: 'Terms and Condition', path: '/#' },
];
const contact = [
    {
        icon: <IoLocationOutline />,
        content: 'New server content, Hennur, Bengaluru- 560043',
    },
    {
        icon: <IoMailOutline />,
        content: 'hello@flamebits.com',
    },
    {
        icon: <CiPhone />,
        content: '+91 1234567809 / +91 1234567890',
    },
];
const socialIcons = [<FaFacebookF />, <FaInstagram />, <FaYoutube />, <FaTwitter />];

const Footer = () => {
    // const { pathname } = useRouter();
    const pathname = usePathname()
    const path = pathname.split('/').filter(Boolean).pop();
    console.log(path, '-----------path');
    return (
        <footer className='bg-inherit'>
            <div className='flex items-center justify-center'>
                <div
                    className=" p-2 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-12 lg:w-5/6"
                    data-aos="fade-up" // AOS animation for the whole footer
                    data-aos-duration="500" // Duration of the animation
                >
                    <div className='flex items-center justify-center p-2'>
                        <div className='flex flex-col gap-2'>
                            <p className='flex text-center text-sm'>
                            Our blog delivers tech solutions and ideas to meet today's needs and prepare for tomorrow's challenges, keeping innovation at your fingertips.                            </p>
                            <div className='flex items-center justify-center flex-wrap gap-2 md:gap-4'>
                                {
                                    socialIcons.map((item, i) => (
                                        <p key={i} className='w-10 h-10 bg-orange-600 rounded-full text-white flex items-center justify-center'>{item}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center gap-3 lg:gap-16'>
                        {/* Company Section */}
                        <div data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-lg font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                {company.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="mr-2 text-xl text-orange-500"><MdNavigateNext /></span>
                                        <Link href={item.path} className=' text-sm hover:text-[#22AAD2] transition duration-300'>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Section */}
                        <div data-aos="fade-up" data-aos-delay="200">
                            <h3 className="text-lg font-semibold mb-4">Support</h3>
                            <ul className="space-y-2">
                                {support.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="mr-2 text-xl text-orange-500"><MdNavigateNext /></span>
                                        <Link href={item.path} className=' text-sm hover:text-[#22AAD2] transition duration-300'>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className='w-5/6' data-aos="fade-up" data-aos-delay="300">
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-4">
                            {contact.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="mr-2 text-xl text-orange-500">{item.icon}</span>
                                    <span className=' text-sm'>{item.content}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-800  p-3'>
                <div>
                    <p className='text-sm md:text-sm text-white text-center'>Copyright © 2024 SJ Properties. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer