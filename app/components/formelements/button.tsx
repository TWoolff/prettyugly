import css from './formelements.module.css'

type ButtonProps = {
    onClick?: () => void
    title: string
    className?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({onClick, title, className, disabled, type}) => {
    return  <button type={type} disabled={disabled} onClick={onClick} className={`${css.button} ${className}`}>{title}</button>
}

export default Button