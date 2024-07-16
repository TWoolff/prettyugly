import css from './accordion.module.css'

type AccordionProps = {
    title: string
    content: string
}

const Accordion: React.FC<AccordionProps> = ({title, content}) => {
    return ( 
        <details className={css.accordion}>
            <summary>
                <h2>{title}</h2>
            </summary>
            <p>{content}</p>
        </details>

    )
}

export default Accordion