'use client'
import { useAppContext } from '../../context'
import css from './filter.module.css'

type FilterProps = {
    data: any[]
}

const Filter: React.FC<FilterProps> = ({ data }) => {
    const { dispatch } = useAppContext()

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        dispatch({ type: 'SET_FILTER', payload: { key: name, value } })
    }

    const uniqueCategories = Array.from(
        new Set(data.map((product) => product.product.metadata.category))
    )

    return (
        <section className={css.filter}>
            <h1>Filter</h1>
            <label>
                Category:
                <select name='category' onChange={handleFilterChange}>
                    <option value=''>All</option>
                    {uniqueCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>
        </section>
    )
}

export default Filter
