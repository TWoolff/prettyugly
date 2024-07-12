import css from './formelements.module.css'

type TextAreaProps = {
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    value?: string
    placeholder?: string
    id: string
    label?: string
}

const TextArea: React.FC<TextAreaProps> = ({onChange = () => {}, value, placeholder, id, label}) => (
    <div className={css.textarea}>
        {label && <label htmlFor={id}>{label}</label>}
        <textarea value={value} onChange={onChange} placeholder={placeholder} id={id} />
    </div>
)

export default TextArea