import React, { useEffect } from 'react'
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import './WhatsApp.css'
import { MdCall, MdCallEnd, MdOutlineCallEnd } from "react-icons/md";
import { IoCallOutline, IoCallSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import whatsAppImg from '../assets/whats-app-bg.png'
import { BiMessageDetail } from 'react-icons/bi';
import { addClick } from '../config/firebase';

const WhatsApp = () => {

  const { username } = useParams()

  useEffect(() => {
    addClick(`${username}@gmail.com`)
  }, [])

  return (
    <Link to={`/${username}/mega`} className='h-full w-full relative '>


      <img src={whatsAppImg} className=' z-20 h-screen w-full absolute top-0 left-0 object-cover object-center' alt="background_image" />
      <div className='  h-screen w-full absolute top-0 left-0 '></div>

      <div className=' z-20 pt-[6vh] relative h-full flex flex-col justify-between pb-[6vh]'>

        <div className=' pt-5 flex flex-col items-center gap-2 '>

          <h1 className=' text-2xl text-white '>JK</h1>
          <div className=' text-xl text-white'>Incoming Call...</div>

        </div>

        <div className=' flex justify-center items-center mb-[10vh]'>
          <FaUserCircle className='text-[9rem] bg-white rounded-full text-gray-300 ' />
        </div>

        <ul className=" flex  justify-evenly text-4xl text-white">

          <li className=' bg-red-600 h-16 w-16 rounded-full flex justify-center items-center  '>
            <MdCallEnd />
          </li>
          <li className=' bg-green-500 h-16 w-16 rounded-full flex justify-center items-center animate-bounce-call '>
            <MdCall />
          </li>
          <li className=' bg-stone-700 h-16 w-16 rounded-full flex justify-center items-center '>
            <BiMessageDetail />
          </li>

        </ul>

      </div>

    </Link>
  )
}

export default WhatsApp