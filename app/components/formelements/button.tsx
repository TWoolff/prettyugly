import css from './formelements.module.css'

type ButtonProps = {
  onClick?: () => void
  title: string | null
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({ onClick, title, className, disabled, type, icon }) => {
  return <button type={type} disabled={disabled} onClick={onClick} className={`${css.button} ${className}`}>
    {icon}
    {title}
  </button>
}

export default Button