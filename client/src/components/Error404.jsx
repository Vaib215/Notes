import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen m-8">
            <img src="https://i.imgur.com/qIufhof.png" alt="404" className="w-64 md:w-72 lg:w-96"/>
            <h1>404 Not Found</h1>
            <Link to="/" className="btn btn-primary">Go back to home</Link>
        </div>
    );
}

export default Error404