import { Outlet } from "react-router-dom"

const Authlayout = () => {
  return (
    <div>
        <h1 className=''>Authlayout</h1>
        <Outlet/>
    </div>
  )
}

export default Authlayout