'use client'
import { useMemo } from 'react'
import { useAppContext } from '@/app/context'
import css from './filter.module.css'
import Input from '../formelements/input'

type FilterProps = {
    data: any[]
}

const Filter: React.FC<FilterProps> = ({ data }) => {
    const { state, dispatch } = useAppContext()

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch({ type: 'SET_FILTER', payload: { key: name, value } })
    }

    const uniqueCategories = useMemo(() => {
        return Array.from(new Set(data.map((product) => product.product.metadata.category)))
    }, [data])

    return (
        <section className={css.filter}>
            <h1>Filter</h1>
            <h2>Categories</h2>
            <Input 
                key='All' 
                onChange={handleFilterChange} 
                name='category' 
                label='All' 
                value='' 
                type='radio' 
                className={css.input} 
                id='All' 
                checked={state.filters.category === ''}
            />
            {uniqueCategories.map((category, i) => (
                <Input 
                    key={i} 
                    onChange={handleFilterChange} 
                    name='category' 
                    label={category} 
                    value={category} 
                    type='radio' 
                    className={css.input} 
                    id={category} 
                    checked={state.filters.category === category}
                />
            ))}
        </section>
    )
}

export default Filter
