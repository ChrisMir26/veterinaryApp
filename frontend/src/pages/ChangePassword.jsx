import {useState, useEffect} from 'react'
import AdminNav from '../components/AdminNav'
import Alert from '../components/Alert'
import useAuth from "../hooks/useAuth";



const ChangePassword = () => {

  const [alert,setAlert] = useState({msg:"",error:true})
  const [password, setPassword] = useState({
    currentPassword:"",
    newPassword:""
  })

  const {savePassword} = useAuth()

 

      const handleSubmit = async e =>{
        e.preventDefault() 

        try {
          if ([password.currentPassword, password.newPassword].includes("")) {
            return setAlert({
              msg: "Please fill out all the required fields.",
              error: true,
            });
          }
          if (
            (password.currentPassword.length < 8 || password.currentPassword.length > 12) ||
            (password.newPassword.length < 8 || password.newPassword.length > 12)
          ) {
            return setAlert({
              msg: "Password must be between 8 and 12 characters.",
              error: true,
            });
          }
          if (password.currentPassword === password.newPassword) {
            return setAlert({
              msg: "New password cannot be the same than current password.",
              error: true,
            });
          }
          const result = await savePassword(password)
            setAlert(result)

            setTimeout(() => {
              setAlert({
                msg:"",
                error:false
              })
            }, 3000);
          
        } catch (error) {
          
        }
      }

const {msg} = alert

  return (
    <>
        <AdminNav/>

        <h2 className='font-black text-3xl text-center mt-10'>Change Password</h2>
        <p className='text-xl mt-5 mb-10 text-center'>Change your {" "}
            <span className='text-indigo-600 font-bold'>Password here</span>
        </p>

        <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form onSubmit={handleSubmit}>
            {msg && <Alert alert={alert} />}
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Current Password</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="currentPassword"
                value={password.currentPassword}
                onChange={e=>setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">New Password</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="newPassword"
                value={password.newPassword}
                onChange={e=>setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })} 
              />
            </div>
            
            <input
              type="submit"
              value="Update password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase
                            w-full mt-5 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword