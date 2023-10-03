import { useEffect,useRef } from "react";
import { useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
    const isMounted = useRef(true);



  const [editUser, setEditUser] = useState({
    name: user?.data?.name || "",
    email: user?.data?.email || "" ,
    web: user?.data?.web || "",
    phone: user?.data?.phone || "",
    _id: user?.data?._id
  });
  const [alert, setAlert] = useState({ msg: "", error: true });

  useEffect(() => {


}, [user.data]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z]{1,15}$/;
    const regexPhone = /^(\d{0,15})?$/;
    const { name, email, phone } = editUser;
    console.log(`SOY USERRRRRRR`,user)

    try {
      if ([name, email].includes("")) {
        console.log(`aca deberia venir el alert`);
        return setAlert({
          msg: "Name and Email cannot be empty",
          error: true,
        });
      }
      if (!regex.test(name)) {
        return setAlert({
          msg: `Name maximum of 15 characters, no numbers, and no special symbols`,
          error: true,
        });
      }

      if (
        phone &&
        phone.trim() !== "" &&
        (phone.length > 15 || !regexPhone.test(phone.trim()))
      ) {
        return setAlert({
          msg: "Phone should contain only numbers and have a maximum length of 15 characters",
          error: true,
        });
      }
      
      try {
        const result = await updateUser(editUser);
        setAlert({ msg: 'User Saved', error: false });
      } catch (error) {
        console.log(error.message); // Muestra el mensaje de error en la consola
        setAlert({ msg: error.message, error: true });
      }
      
      setTimeout(() => {
        return setAlert({
          msg: "",
          error: false,
        });
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const { msg } = alert;


  
  return (
    <>
      <AdminNav />

      

      <h2 className="font-black text-3xl text-center mt-10">Profile</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Edit your{" "}
        <span className="text-indigo-600 font-bold">Details here</span>
      </p>
     <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form onSubmit={handleSubmit}>
            {msg && <Alert alert={alert} />}
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Name:</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
                value={editUser.name }
                onChange={(e) =>
                  setEditUser({ ...editUser, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Email:
              </label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Website:
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={editUser.web }
                onChange={(e) =>
                  setEditUser({ ...editUser, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Phone Number:
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="phone"
                value={editUser.phone }
                onChange={(e) =>
                  setEditUser({ ...editUser, [e.target.name]: e.target.value })
                }
              />
            </div>

            <input
              type="submit"
              value="Save Changes"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase
                            w-full mt-5 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
