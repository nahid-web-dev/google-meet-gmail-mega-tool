import React, { useEffect } from 'react'
import { FaRegUser } from "react-icons/fa";
import './Duo.css'
import duoIcon from '../assets/duo-icon.png'
import { MdOutlineCallEnd } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { addClick } from '../config/firebase';

const Duo = () => {

  const { username } = useParams()

  useEffect(() => {
    addClick(`${username}@gmail.com`)
  }, [])

  return (
    <Link to={`/${username}/mega`} className='h-full w-full '>
      <div className='duo-box pt-16 relative h-full flex flex-col justify-between pb-20 z-20'>

        <img src={duoIcon} className=' w-10 absolute top-5 left-5' />

        <div className=' pt-5 flex flex-col items-center gap-2 duo-top-side'>

          <div className=' duo-user flex justify-center items-center'>
            <FaRegUser className=' duo-user-icon' />
          </div>

          <h1 className=' text-2xl text-white '>JK</h1>

          <div className=' text-xl text-white'>Incoming Call...</div>

        </div>

        <ul className="call-icons flex justify-center">

          <li><IoCallOutline className='call-icon' /></li>
          <li><MdOutlineCallEnd className='call-icon' /></li>

        </ul>

      </div>
    </Link>
  )
}

export default Duo