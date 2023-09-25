import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import useAuth from "../hooks/useAuth"

const AdminLayout = () => {

    const {user,loading,setLoading} = useAuth()


  return (
    <>  
    <Header/>
    {loading ?
     ("loading....")
      : (user ?<main className='container mx-auto mt-10'> <Outlet/> </main> : "Sorry you have to log in first")}
      <Footer/>
    </>
  )
}

export default AdminLayout