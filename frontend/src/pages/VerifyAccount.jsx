import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert"

const VerifyAccount = () => {
  const params = useParams();
  const { token } = params;

  const [accountVerified, setAccountVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ msg: "", error: false });
  const checkAccount = async () => {
    console.log('Renderizando el componente');

    try {
      
      const URL = `http://localhost:4000/api/veterinarios/verify/${token}`;
      const { data } = await axios.get(URL);
      setAccountVerified(true)
      setAlert({msg:data.msg,error:false})
      console.log(data.msg)

    } catch (error) {
      setAlert({
        msg:error.response.data.msg,
        error:true
      })
    }  
    setLoading(false);
  };


  useEffect(() => {
  
    checkAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirm your account and start managing your{" "}
          <span className="text-black">patients.</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white ">
        {!loading && <Alert alert={alert}/> } 

        {accountVerified && <Link to="/" className="block text-center my-5 text-gray-500">
           Youre ready to log in !
          </Link>}
      </div>
    </>
  );
};

export default VerifyAccount;


// import React from "react";
// import axios from "axios";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import Alert from "../components/Alert"

// const VerifyAccount = () => {
//   const params = useParams();
//   const { token } = params;

//   const [accountVerified, setAccountVerified] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState({ msg: "", error: false });
  

//   useEffect(() => {
//     const checkAccount = async () => {
//       try {
//         const URL = `http://localhost:4000/api/veterinarios/verify/${token}`;
//         const { data } = await axios(URL);
//         setAccountVerified(true)
//         setAlert({msg:data.msg,error:false})
//         console.log(data.msg)

//       } catch (error) {
//         setAlert({
//           msg:error.response.data.msg,
//           error:true
//         })
//       }  
//       setLoading(false);
//     };

//     checkAccount();
//   }, []);

//   return (
//     <>
//       <div>
//         <h1 className="text-indigo-600 font-black text-6xl">
//           Confirm your account and start managing your{" "}
//           <span className="text-black">patients.</span>
//         </h1>
//       </div>
//       <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white ">
//         {!loading && <Alert alert={alert}/> } 
//       </div>
//     </>
//   );
// };

// export default VerifyAccount;
