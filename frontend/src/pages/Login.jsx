import {useState,useEffect}from "react";
import { Link,useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import axios from "axios"
import Alert from "../components/Alert";


const Login = () => {
 // const {user,setUser} = useAuth()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [alert,setAlert] = useState({msg:"",error:false})
  const navigate = useNavigate()
  const URL = "http://localhost:4000/api/veterinarios/login"


  const submitForm = async (e) =>{
    e.preventDefault();
    if ([ email, password].includes("")) {
      console.log(`hola`)
      return setAlert({
        msg: "Please fill out all the required fields.",
        error: true,
      });


    }
    if (password.length < 8 || password.length > 12) {
      return setAlert({
        msg: "Password must be between 8 and 12 characters.",
        error: true,
      });
    }


    const verificacionEmail = async () =>{

      try {
        const {data} = await axios.post(URL,{email,password}) 
        console.log(data)
        localStorage.setItem('token', data.token)
        navigate("/admin")

      } catch (error) {
        setAlert({msg:error.response.data?.msg,error:true})
        
      }

    }



verificacionEmail()
  }


const {msg} = alert
  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl ">
        Log in to your account and manage your {" "}
          <span className="text-black"> patients.</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white ">
        {msg && <Alert alert={alert}/> }
        <form onSubmit={submitForm}>
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
              onChange={(e)=>{setPassword(e.target.value)}}

            />
          </div>

          <input
            type="submit"
            value="Log in"
            className="bg-indigo-700 w-full py-3 px-10
                  rounded-xl text-white uppercase font-bold mt-5
                  hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <div className="mt-10 lg:flex lg:justify-around">
          <Link to="/sign-up" className="block text-center my-5 text-gray-500">
            Don't have an account yet? Sign up!
          </Link>
          <Link
            to="/forgot-password"
            className="block text-center my-5 text-gray-500"
            > Forgot password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
