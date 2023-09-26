import React from 'react'
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import useAuth from "../hooks/useAuth"

const AdminLayout = () => {

    const {user,loading} = useAuth()
  const navigate = useNavigate()

  return (
    <>  
    <Header/>
    {loading ?
     ("loading....")
      : (user && user ?<main className='container mx-auto mt-10'> <Outlet/> </main> : navigate("/"))}
      <Footer/>
    </>
  )
}

export default AdminLayout