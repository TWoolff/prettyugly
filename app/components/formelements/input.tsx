import css from './formelements.module.css'

type InputProps = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    type: 'text' | 'email' | 'password' | 'number' | 'search' | 'range' | 'checkbox' | 'radio' | 'tel'
    id: string
    name: string
    value?: string
    checked?: boolean
    placeholder?: string
    required?: boolean
}

const Input: React.FC<InputProps> = ({onChange = () => {}, label = '', type, id, name, value = '', checked = false, placeholder, required}) => (
    <div className={css[type]}>
        {label && <label htmlFor={id}>{label}</label>}
        <input 
            type={type}
            name={name}
            id={id}
            onChange={onChange}
            value={value}
            checked={checked}
            placeholder={placeholder}
            required={required}
        />
    </div>
)

export default Input
