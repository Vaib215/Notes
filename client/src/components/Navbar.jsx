import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const handleLogout = async () => {
        await navigate('/logout')
    }
    const handleSearch = async (e) => {
        await navigate(`/home/search?q=${search}`)
    }
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <label htmlFor="my-drawer" className="drawer-button btn btn-ghost normal-case text-xl">Notes</label>
                </div>
                <div className="navbar-center flex hidden md:flex">
                    <div className="form-control flex-row gap-4">
                        <input type="text" placeholder="Search" className="input input-primary input-bordered w-48 lg:w-full" value={search} onChange={e => setSearch(e.target.value)} />
                        <button className="btn btn-outline btn-primary" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="navbar-end">
                    <button onClick={handleLogout} className="btn btn-outline btn-primary">Logout</button>
                </div>
            </div>
            <div className="flex md:hidden mx-auto justify-center bg-base-100">
                <div className="form-control flex-row gap-4">
                    <input type="text" placeholder="Search" className="input input-primary input-bordered w-48 lg:w-full" value={search} onChange={e => setSearch(e.target.value)} />
                    <button className="btn btn-outline btn-primary" onClick={handleSearch}>Search</button>
                </div>
            </div>
        </>
    )
}

export default Navbar