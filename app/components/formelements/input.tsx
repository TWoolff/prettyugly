type InputProps = {
    onChange: () => void
    label?: string
    type: string
    className: string
}

const Input: React.FC<InputProps> = ({onChange, label, type, className}) => {
    return (
        <div className={className}>
            <input type={type} name="input" id="input" onChange={onChange}/>
            {label && <label htmlFor="input">{label}</label>}
        </div>
    )
}

export default Input