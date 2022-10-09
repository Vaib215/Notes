import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import http from "../services/httpService";
import Breadcrumb from "./Breadcrumb";

const Search = () => {
    const [searchParams] = useSearchParams()
    const [results, setResults] = useState([])
    const fetchNotes = async () => {
        await http.get(`/notes/search?q=${searchParams.get("q")}&tags=${searchParams.get("tags")}`).then((res) => {
            setResults(Object.entries(res.data))
        })
            .catch(err => {
                return (err)
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
            <Breadcrumb home search={searchParams.get("q") || searchParams.get("tags")} nav={`/home/Search Results: ${searchParams.get("q") || searchParams.get("tags")}`} />
            <div className="text-3xl p-4 lg:px-16 lg:py-8">Search Results: </div>
            <ul className="notes-wrapper grid place-items-center mb-4 gap-y-8 lg:mb-8 md:grid-cols-2 lg:grid-cols-3">
                {results.map((result, index) => {
                    return (
                        <div key={index} className="card bg-base-200 shadow-md shadow-primary">
                            <div className="card-body">
                                <h3 className="text-3xl font-semibold">{result[1].title}</h3>
                                <div className="flex flex-wrap-reverse gap-2">
                                    {result[1].tags.map((tag) => {
                                        return (
                                            <small className="badge badge-outline" key={tag}>{tag}</small>
                                        )
                                    })}</div>
                                <p>{result[1].content.slice(0, 30) + "..."}</p>
                                <div className="btn-group">
                                    <Link to={`/home/${result[1]._id}`} className="btn btn-sm btn-primary">View</Link>
                                    <Link to={`/home/edit/${result[1]._id}`} className="btn btn-sm btn-success">Edit</Link>
                                    <button onClick={() => deleteNote(result[1]._id)} className="btn btn-sm btn-error">Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </ul>
        </>
    )
}

export default Search