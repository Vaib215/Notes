const Alert = ({ type, message }) => {
    return (
        <div>
                <div className={`absolute w-fit bottom-6 right-8 alert alert-${type} shadow-lg z-10`}>
                <span>{message}</span>
                <span className="hidden">
                    <div className="alert-success"></div>
                    <div className="alert-warning"></div>
                    <div className="alert-error"></div>
                </span>
            </div>
        </div>
    )
}

export default Alert