type ButtonProps = {
    onClick: () => void
    title: string
    className: string
}

const Button: React.FC<ButtonProps> = ({onClick, title, className}) => {
    return  <button onClick={onClick} className={className}>{title}</button>
}

export default Button