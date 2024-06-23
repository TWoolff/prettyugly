type InputProps = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    type: 'text' | 'email' | 'password' | 'number' | 'search' | 'range' | 'checkbox' | 'radio'
    className: string
    id: string
    name: string
    value?: string
    checked?: boolean
}

const Input: React.FC<InputProps> = ({ onChange, label, type, className, id, name, value, checked }) => {
    return (
        <div className={className}>
            <input 
                type={type} 
                name={name} 
                id={id} 
                onChange={onChange} 
                value={value} 
                checked={checked}
            />
            {label && <label htmlFor={id}>{label}</label>}
        </div>
    )
}

export default Input
