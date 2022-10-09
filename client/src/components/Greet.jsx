import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import http from "../services/httpService"

const Greet = ({ name }) => {
    const navigate = useNavigate()
    // Fetch all notes for user 
    const [notes, setNotes] = useState([]);
    const fetchNotes = async () => {
        await http.get("/notes/all").then((res) => {
            setNotes(res.data)
        })
    }
    useEffect(() => {
        fetchNotes()
    }, [])

    const deleteNote = async (note) => {
        await http.delete(`/notes/${note}`).then((res) => {
            fetchNotes()
        })
    }

    return (
        <>
            <div className="hero min-h-[50vh]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello <span className="text-primary">{name}!</span></h1>
                        <p className="py-6">Make your life awesome by making notes for everything.</p>
                        <button onClick={() => navigate('/home/create')} className="btn btn-primary">Create new notes</button>
                    </div>
                </div>
            </div>
            <ul className="notes-wrapper grid place-items-center mb-4 gap-y-8 lg:mb-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Map notes */}
                {notes.map((note, index) => {
                    return (
                        <li key={index} className="card min-w-64 w-96 h-[16em] bg-base-200 shadow-md shadow-primary">
                            <div className="card-body">
                                <h3 className="text-3xl font-semibold">{note.title}</h3>
                                <div className="flex flex-wrap-reverse gap-2">
                                    {note.tags.map((tag) => {
                                        return (
                                            <Link to={`/home/search?tags=${tag}`} > <small className="badge badge-outline" key={tag}>{tag}</small></Link>
                                        )
                                    })}</div>
                                <p>{note.content.slice(0, 30) + "..."}</p>
                                <div className="btn-group">
                                    <Link to={`/home/${note._id}`} className="btn btn-sm btn-primary">View</Link>
                                    <Link to={`/home/edit/${note._id}`}className="btn btn-sm btn-success">Edit</Link>
                                    <button onClick={() => deleteNote(note._id)} className="btn btn-sm btn-error">Delete</button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Greet