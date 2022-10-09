import { useEffect, useState } from "react"
import http from "../services/httpService"
import NotesList from "./NotesList"

const Home = () => {
    const [name, setName] = useState("User")
    useEffect(() => {
        const fetchName = async () => {
            await http.get("/user").then((res) => {
                setName(res.data.json.name)
            })
        }
        fetchName()
    }, [])

    return (
        <>
            <NotesList name={name}/>
        </>
    )
}

export default Home