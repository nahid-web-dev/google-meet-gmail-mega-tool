import React, { useEffect, useRef, useState } from 'react';
import duoRing from '../assets/duoRing.mp3';
import faceTimeRing from '../assets/FaceTime.mp3';
import whatsAppRing from '../assets/whats-app-ring.m4a'
import { useLocation, useParams } from 'react-router-dom';

const useMicrophonePermission = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePermission = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          setHasPermission(true);
        })
        .catch(error => {
          setError(error);
        });
    };

    handlePermission();
  }, []);

  return { hasPermission, error };
};

const Call = () => {

  const ringtoneRef = useRef(null);
  const { hasPermission, error } = useMicrophonePermission();


  const location = useLocation()

  const path = location.pathname.split('/')[2]

  useEffect(() => {

    if (hasPermission && ringtoneRef.current) {
      ringtoneRef.current.play();
    }
  }, [hasPermission]);

  if (error) {
    return <div>Error accessing microphone: {error.message}</div>;
  }

  return (
    <div className="calling-box">
      <audio ref={ringtoneRef} id="ringtone" loop src={
        path == 'duo' ? duoRing : path == 'whatsapp' ? whatsAppRing : path == 'facetime' && faceTimeRing
      }></audio>
    </div>
  );
};

export default Call;


// import React, { useEffect, useRef, useState } from 'react';
// import ring from '../assets/ring.mp3';

// const useMicrophonePermission = () => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const handlePermission = () => {
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//           setHasPermission(true);
//         })
//         .catch(error => {
//           setError(error);
//         });
//     };

//     handlePermission();
//   }, []);

//   return { hasPermission, error };
// };

// const Call = () => {
//   const ringtoneRef = useRef(null);
//   const { hasPermission, error } = useMicrophonePermission();

//   useEffect(() => {
//     console.log('reached')
//     if (hasPermission && ringtoneRef.current) {
//       ringtoneRef.current.play();
//     }
//   }, [hasPermission, ringtoneRef.current]);

//   if (error) {
//     return <div>Error accessing microphone: {error.message}</div>;
//   }

//   return (
//     <div className="calling-box">
//       <audio ref={ringtoneRef} id="ringtone" loop src={ring}></audio>
//     </div>
//   );
// };

// export default Call;



