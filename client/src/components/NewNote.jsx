import Breadcrumb from "./Breadcrumb"
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from "react";
import http from "../services/httpService";
import Alert from "./Alert";
import { useNavigate, useParams } from "react-router-dom";

const NewNote = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState("")
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate()
    const edit = useParams().id
    useEffect(() => {
        if (edit) {
            const fetchNote = async () => {
                await http.get(`/notes/${edit}`).then((res) => {
                    setTitle(res.data.title)
                    setTags(res.data.tags.join(","))
                    setContent(res.data.content)
                })
            }
            fetchNote()
        }
    }, [edit])
    const addNewNote = async (e) => {
        e.preventDefault()
        await http.post('/notes', {
            title: e.target.title.value,
            tags: e.target.tags.value.split(','),
            content
        })
            .then(res => {
                setAlert(true)
                setTimeout(() => {
                    setAlert(null)
                    navigate(`/home/${res.data}`)
                }, 1000)
            })
            .catch(err => {
                setAlert(false)
                setTimeout(() => {
                    setAlert(null)
                }, 1000)
            })
    }
    const editNote = async (e) => {
        e.preventDefault()
        await http.put(`/notes/${edit}`, {
            title: e.target.title.value,
            tags: e.target.tags.value.split(','),
            content
        })
            .then(res => {
                setAlert(true)
                setTimeout(() => {
                    setAlert(null)
                    navigate(`/home/${edit}`)
                }, 1000)
            })
            .catch(err => {
                setAlert(false)
                setTimeout(() => {
                    setAlert(null)
                }, 1000)
            })
    }
    return (
        <>
            {edit && <Breadcrumb nav={`/home/edit/${title}`} notes={edit} />}
            {!edit && <Breadcrumb nav={'/home/create'} />}
            <form onSubmit={edit?editNote:addNewNote} className="container flex flex-col justify-center items-center gap-2">
                <div className="flex flex-col lg:flex-row gap-2">
                    <div className="form-control gap-2 mx-auto lg:mx-0 w-full max-w-xs">
                        <label htmlFor="title" className="label">
                            <span className="text-lg">Title </span>
                        </label>
                        <input id="title" name="title" type="text" placeholder="The best way to sell things" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control gap-2 mx-auto lg:mx-0 w-full max-w-xs">
                        <label htmlFor="tags" className="label">
                            <span className="text-lg">Tags</span>
                        </label>
                        <input id="tags" name="tags" type="text" placeholder="Seperate using comma ( , )" className="input input-bordered w-full max-w-xs" value={tags} onChange={e=>setTags(e.target.value)}/>
                    </div>
                </div>
                <div className="form-control gap-2 w-full max-w-[90vw]">
                    <label htmlFor="content" className="label">
                        <span className="text-2xl">Content</span>
                    </label>
                    <div className="container" id="content">
                        <MDEditor
                            value={content}
                            onChange={setContent}
                            style={{
                                'minHeight': '50vh',
                                'borderRadius': '20px',
                                'overflow': 'hidden'
                            }}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
            {alert && (<Alert type="success" message="Successfully saved!" />)}
            {alert === false && (<Alert type="error" message="Something went wrong!" />)}
        </>
    )
}

export default NewNote