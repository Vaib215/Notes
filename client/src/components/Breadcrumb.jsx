import { Link } from "react-router-dom";

const Breadcrumb = ({ nav, home, notes, search }) => {
    const paths = nav.split('/').filter((path) => path !== '');
    return (
        <div className="text-md breadcrumbs w-fit my-2 mx-8">
            <ul>
                {home && (<li>
                    <Link to="/">
                        <span className="icon">
                            {/* Home icon svg */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                                <path d="M5 12v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2v-8m-10 0l2 2l2 -2" />
                            </svg>
                        </span >
                        <span className="mx-1">Home</span>
                    </Link >
                </li >)}
                {
                    search && (<li>
                        <Link to={`/home/search?q=${search}`}>
                            <span className="icon">
                                {/* Search icon svg */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx="10" cy="10" r="7" />
                                    <line x1="21" y1="21" x2="15" y2="15" />
                                </svg>
                            </span>
                            <span className="mx-1">Search: {search}</span>
                        </Link>
                    </li>)
                }
                {
                    !notes && !search && paths.map((path, index) => {
                        return (
                            <li key={index}>
                                <Link to={`/${paths.slice(0, index + 1).join('/')}`}>
                                    {path.charAt(0).toUpperCase() + path.slice(1)}
                                </Link>
                            </li>
                        );
                    })
                }
                {notes && paths.map((path, index) => {
                    return (
                        <li key={index}>
                            {
                                index === paths.length - 1 ? (
                                    <Link to={`/${paths.slice(0, index).join('/')}/${notes}`}>
                                        {path.charAt(0).toUpperCase() + path.slice(1)}
                                    </Link>
                                ) :
                                    (
                                        <Link to={`/${paths.slice(0, index + 1).join('/')}`}>
                                            {path.charAt(0).toUpperCase() + path.slice(1)}
                                        </Link>)
                            }
                        </li>
                    );
                })}
            </ul >
        </div >
    )
}

export default Breadcrumb