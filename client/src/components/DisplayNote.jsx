import MDEditor from '@uiw/react-md-editor';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import http from '../services/httpService';
import Breadcrumb from './Breadcrumb';

const DisplayNote = () => {
    let { id } = useParams();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([])
    // Fetch note from database using id
    const fetchNote = async () => {
        await http.get(`/notes/${id}`).then((res) => {
            setTitle(res.data.title)
            setTags(res.data.tags)
            setContent(res.data.content)
        })
    }
    useEffect(() => {
        fetchNote()
    }, [id])
    const deleteNote = async (note) => {
        await http.delete(`/notes/${note}`).then((res) => {
            fetchNote()
        })
    }
    return (
        <>
            <Breadcrumb nav={`/home/${title}`} notes={id} />
            <form>
                <div className="flex flex-col lg:px-32 lg:flex-row gap-2">
                    <div className="form-control gap-2 py-4 w-full max-w-xs">
                        <label htmlFor="title" className="label">
                            <span className="text-lg">Title </span>
                        </label>
                        <h1 className="text-3xl w-full max-w-xs">{title}</h1>
                    </div>
                    <div className="form-control gap-2 py-4 w-full max-w-xs">
                        <label htmlFor="tags" className="label">
                            <span className="text-lg">Tags</span>
                        </label>
                        <div className="flex flex-wrap-reverse gap-2">
                            {tags.map((tag) => {
                                return (
                                    <Link to={`/home/search?tags=${tag}`} className="badge badge-lg badge-outline" key={tag}>{tag}</Link>
                                )
                            })}</div>
                    </div>
                </div>
                <div className="form-control p-4 lg:px-32 items-start gap-2 w-full max-w-[90vw]">
                    <label htmlFor="content" className="label">
                        <span className="text-2xl">Content</span>
                    </label>
                    <div className="container flex border border-primary rounded-lg min-h-[16em] p-4 lg:p-8" id="content">
                        <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap',background:'transparent', color:'inherit' }} />
                    </div>
                </div>
                <div className="btn-group p-4 lg:px-32">
                    <Link to={`/home/edit/${id}`} className="btn btn-primary">Edit</Link >
                    <button onClick={deleteNote} className="btn btn-error">Delete</button>
                </div>
            </form>
        </>
    )
}

export default DisplayNote