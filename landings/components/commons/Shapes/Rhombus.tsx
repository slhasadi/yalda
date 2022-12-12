type Props = {
    className?: string
}
const Rhombus = ({className}: Props) => {
    return <div>
        <div className={`rotate-45 ${className}`}/>
    </div>
}

export default Rhombus;
