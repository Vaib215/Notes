import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import DisplayNote from "./DisplayNote"
import Greet from "./Greet"
import Navbar from "./Navbar"
import NewNote from "./NewNote"
import Search from "./Search"
import ThemesList from "./ThemesList"

const NotesList = ({ name }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-color-mode', 'light')
    })
    
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Greet name={name} />} />
                    <Route path="/search" element={<Search/>} />
                    <Route path="/create" element={<NewNote />} />
                    <Route path="/edit/:id" element={<NewNote />} />
                    <Route path="/:id" element={<DisplayNote />} />
                </Routes>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <div className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <div>
                        <label className="btn m-1">Current Theme : {theme}</label>
                        <ThemesList setTheme={setTheme} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesList