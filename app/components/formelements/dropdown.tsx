import { ChangeEventHandler } from 'react'

type DropdownProps = {
    onChange: ChangeEventHandler<HTMLSelectElement>
    options: string[]
    label?: string
    defaultValue?: string
    name: string
    className: string
}

const Dropdown: React.FC<DropdownProps> = ({ onChange, options, name, defaultValue, label, className }) => {
    return ( 
        <label>
            {label}
            <select name={name} onChange={onChange} className={className}>
                <option value=''>{defaultValue}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default Dropdown
