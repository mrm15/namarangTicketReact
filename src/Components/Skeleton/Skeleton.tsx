import './skeleton.css'

const Skeleton = ({ classes }) => {
    const classNames = `skeleton ${classes} animate-pulse-my-skeleton`

    return <div className={classNames}></div>
}
export default Skeleton