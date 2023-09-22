import { Outlet } from "react-router-dom"

const Authlayout = () => {
  return (
    <div>
        <main className='container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center'>

        <Outlet/>
        </main>
    </div>
  )
}

export default Authlayout