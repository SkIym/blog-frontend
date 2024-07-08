const Notification = ({ flag, message }) => {

    let className = 'error'
    className = flag
    return (
        <div className={className}>{message}</div>
    )
}

export default Notification